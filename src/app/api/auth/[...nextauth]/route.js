import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/dbConnect";

export const {
  handlers: { GET, POST },
} = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",

  providers: [
    // Google Provider (profile mapping included)
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

    // Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        // Validate input quickly
        if (!credentials?.email || !credentials?.password) {
          // return null so NextAuth treats as invalid credentials
          return null;
        }

        // 1) Find user
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) {
          // return null => signIn will get an error code (credentials signin failed)
          return null;
        }

        // 2) Validate password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          // invalid password
          return null;
        }

        // 3) On success return a plain user object (no sensitive fields)
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user",
          lastLogin: user.lastLogin || null,
          image: user.image || "/default-profile.png",
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin", // keep your signin page path
  },

  callbacks: {
    // signIn: update DB on successful signin (Google or credentials)
    async signIn({ user, account }) {
      try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        const image = user.image || "/default-profile.png";

        if (account?.provider === "google") {
          // For Google: upsert user with profile image
          const existingUser = await db
            .collection("users")
            .findOne({ email: user.email });

          if (existingUser) {
            await db.collection("users").updateOne(
              { email: user.email },
              {
                $set: {
                  name: user.name,
                  image,
                  lastLogin: new Date(),
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

        if (account?.provider === "credentials") {
          // For credentials: update lastLogin if user exists (authorize already ensured user exists)
          await db
            .collection("users")
            .updateOne(
              { email: user.email },
              { $set: { lastLogin: new Date(), updatedAt: new Date() } }
            );
        }

        return true;
      } catch (err) {
        console.error("signIn callback error:", err);
        // don't throw — return false to indicate sign-in failed
        return false;
      }
    },

    // attach useful data to JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.lastLogin = user.lastLogin;
        token.image = user.image || "/default-profile.png";
      }
      return token;
    },

    // expose data on session
    async session({ session, token }) {
      if (token) {
        session.user = session.user || {};
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.lastLogin = token.lastLogin;
        session.user.image = token.image;
      }
      return session;
    },
  },
});
