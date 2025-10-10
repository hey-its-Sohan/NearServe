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
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
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
        const db = client.db(process.env.DB_NAME);

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
          image: user.image || "/default-profile.png", // fallback
        };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  callbacks: {
    async signIn({ user, account }) {
      const client = await clientPromise;
      const db = client.db(process.env.DB_NAME);

      if (account.provider === "google") {
        const existingUser = await db
          .collection("users")
          .findOne({ email: user.email });
        const image = user.image || "/default-profile.png";

        if (existingUser) {
          await db.collection("users").updateOne(
            { email: user.email },
            {
              $set: {
                lastLogin: new Date(),
                name: user.name,
                image,
                updatedAt: new Date(),
              },
            }
          );
        } else {
          await db.collection("users").insertOne({
            name: user.name || "",
            email: user.email,
            image,
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

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.lastLogin = user.lastLogin;
        token.image = user.image || "/default-profile.png";
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.lastLogin = token.lastLogin;
        session.user.image = token.image;
      }
      return session;
    },
  },
});
