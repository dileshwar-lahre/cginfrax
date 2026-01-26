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
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
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
        
        try {
          await connectToDB();
          const user = await User.findOne({ email: credentials.email.toLowerCase().trim() });
          if (!user) {
            throw new Error("Invalid email or password");
          }
          
          // ✅ Check if user has password (Google users might not have)
          if (!user.password) {
            throw new Error("Please sign in with Google or reset your password");
          }
          
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          
          if (!isPasswordCorrect) {
            throw new Error("Invalid email or password");
          }
          
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.username,
            mobile: user.mobile,
          };
        } catch (err) {
          console.error("Auth Error:", err);
          // Don't expose internal errors
          if (err.message.includes("Invalid") || err.message.includes("required")) {
            throw err;
          }
          throw new Error("Authentication failed. Please try again.");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user?.email) {
        try {
          await connectToDB();
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            // ✅ Temporary mobile number (user will be prompted to update)
            const tempMobile = "G-" + Math.floor(1000000000 + Math.random() * 9000000000).toString();
            const dummyPassword = await bcrypt.hash("google-auth-secret", 10);
            const newUser = new User({
              username: user.name || "User",
              email: user.email,
              mobile: tempMobile, // User will be prompted to update this
              password: dummyPassword,
            });
            await newUser.save();
          }
          return true;
        } catch (err) {
          console.error("Google Login Error:", err);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // ✅ Initial sign in - store user data in token
      if (user) {
        try {
          await connectToDB();
          const dbUser = await User.findOne({ email: user.email });
          if (dbUser) {
            token.id = dbUser._id.toString();
            token.mobile = dbUser.mobile || user.mobile;
            token.username = dbUser.username || user.name;
            token.email = dbUser.email;
          } else {
            // Fallback to user object if DB query fails
            token.id = user.id;
            token.mobile = user.mobile;
            token.username = user.name;
            token.email = user.email;
          }
        } catch (error) {
          console.error("JWT callback error:", error);
          // Fallback to user object if DB query fails
          if (user) {
            token.id = user.id;
            token.mobile = user.mobile;
            token.username = user.name;
            token.email = user.email;
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      // ✅ Use token data instead of DB query (prevents 500 errors)
      if (token && session?.user) {
        session.user.id = token.id || null;
        session.user.mobile = token.mobile || null;
        session.user.username = token.username || token.name || null;
        session.user.email = token.email || session.user.email;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // ✅ Fix redirect URI mismatch - ensure correct redirect URL
      try {
        const nextAuthUrl = process.env.NEXTAUTH_URL || baseUrl;
        const urlObj = new URL(url, baseUrl);
        const baseUrlObj = new URL(nextAuthUrl);
        
        // If redirecting to same origin, allow it
        if (urlObj.origin === baseUrlObj.origin) {
          return url;
        }
        
        // If it's a relative URL, make it absolute
        if (url.startsWith('/')) {
          return `${baseUrlObj.origin}${url}`;
        }
        
        // Otherwise redirect to base URL
        return baseUrlObj.origin;
      } catch (error) {
        console.error("Redirect callback error:", error);
        return baseUrl;
      }
    },
  },
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", 
    error: "/",
  },
  debug: process.env.NODE_ENV === "development",
  events: {
    async signIn({ user, account }) {
      // Log successful sign-ins for debugging
      if (process.env.NODE_ENV === "development") {
        console.log("User signed in:", user.email, account?.provider);
      }
    },
    async signOut() {
      // Handle sign out if needed
    },
  },
};