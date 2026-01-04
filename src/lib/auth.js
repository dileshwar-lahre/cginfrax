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
          if (!user) {
            throw new Error("Invalid email or password");
          }
          
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          
          if (!isPasswordCorrect) {
            throw new Error("Invalid email or password");
          }
          
          return user;
        } catch (err) {
          console.error("Auth Error:", err);
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
            const randomMobile = "G-" + Math.floor(1000000000 + Math.random() * 9000000000).toString();
            const dummyPassword = await bcrypt.hash("google-auth-secret", 10);
            const newUser = new User({
              username: user.name,
              email: user.email,
              mobile: randomMobile,
              password: dummyPassword,
            });
            await newUser.save();
          }
          return true;
        } catch (err) {
          console.log("Google Login Error:", err);
          return false;
        }
      }
      return true;
    },
    async session({ session }) {
      await connectToDB();
      const sessionUser = await User.findOne({ email: session.user.email });
      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
        session.user.mobile = sessionUser.mobile;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", 
  }
};