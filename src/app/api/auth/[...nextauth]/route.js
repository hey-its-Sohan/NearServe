import clientPromise from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
} = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("NearServe");

        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });
        if (!user) throw new Error("No user found. Please sign up first.");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
          lastLogin: user.lastLogin || null,
        };
      },
    }),
  ],

  pages: { signIn: "/signin" },

  callbacks: {
    // SignIn: update DB
    async signIn({ user, account }) {
      const client = await clientPromise;
      const db = client.db("NearServe");

      if (account.provider === "google") {
        const existingUser = await db
          .collection("users")
          .findOne({ email: user.email });
        if (existingUser) {
          await db.collection("users").updateOne(
            { email: user.email },
            {
              $set: {
                lastLogin: new Date(),
                name: user.name,
                updatedAt: new Date(),
              },
            }
          );
        } else {
          await db.collection("users").insertOne({
            name: user.name || "",
            email: user.email,
            role: "user",
            provider: "google",
            createdAt: new Date(),
            lastLogin: new Date(),
          });
        }
      }

      if (account.provider === "credentials") {
        const existingUser = await db
          .collection("users")
          .findOne({ email: user.email });
        if (!existingUser)
          throw new Error("No user found. Please sign up first.");
        await db
          .collection("users")
          .updateOne(
            { email: user.email },
            { $set: { lastLogin: new Date(), updatedAt: new Date() } }
          );
      }

      return true;
    },

    // JWT: attach full user info
    async jwt({ token, user, account }) {
      const client = await clientPromise;
      const db = client.db("NearServe");

      if (user) {
        // For Credentials login, user already has id, role, lastLogin
        token.id = user.id;
        token.role = user.role;
        token.lastLogin = user.lastLogin;
      } else if (account?.provider === "google") {
        // For Google login, fetch user from DB
        const dbUser = await db
          .collection("users")
          .findOne({ email: token.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role || "user";
          token.lastLogin = dbUser.lastLogin || null;
        }
      }

      return token;
    },

    // Session: pass token data to client
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.lastLogin = token.lastLogin;
      }
      return session;
    },
  },
});
