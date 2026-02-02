import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        await connectToDB();
        try {
          const user = await User.findOne({ email: credentials.email.toLowerCase().trim() });
          if (!user) throw new Error("Invalid email or password");
          
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordCorrect) throw new Error("Invalid email or password");
          
          return user;
        } catch (err) {
          throw new Error(err.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        await connectToDB();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const tempMobile = "G-" + Math.floor(1000000000 + Math.random() * 9000000000).toString();
            const dummyPassword = await bcrypt.hash("google-auth-secret", 10);
            const newUser = new User({
              username: user.name,
              email: user.email,
              mobile: tempMobile,
              password: dummyPassword,
            });
            await newUser.save();
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      return true;
    },
    
    // ⬇️ YE PRODUCTION KE LIYE ZAROORI HAI ⬇️
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || user._id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        await connectToDB();
        const sessionUser = await User.findOne({ email: token.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
          session.user.mobile = sessionUser.mobile;
          session.user.username = sessionUser.username; // Add this too
        }
      }
      return session;
    },
  },
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", 
  }
};