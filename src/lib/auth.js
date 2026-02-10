import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  trustHost: true, 
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        await connectToDB();
        const user = await User.findOne({ 
          email: credentials.email.toLowerCase().trim() 
        });
        
        if (!user || !user.password) return null;
        
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) return null;
        
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
        };
      },
    }),
  ],
  callbacks: {
    // ✅ REDIRECT CALLBACK: WWW aur Non-WWW ka lafada khatam
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async signIn({ user, account }) {
      if (account.provider === "google") {
        await connectToDB();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            // ✅ UNIQUE MOBILE: Timestamp use kar rahe hain taaki clash na ho
            const tempMobile = "G-" + Date.now(); 
            const dummyPassword = await bcrypt.hash(process.env.NEXTAUTH_SECRET, 10);
            
            await User.create({
              username: user.name || user.email.split('@')[0],
              email: user.email,
              mobile: tempMobile, 
              password: dummyPassword,
              image: user.image
            });
          }
          return true;
        } catch (err) {
          console.error("SignIn Error:", err);
          return false;
        }
      }
      return true;
    },
    
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      // Frontend se session update karne ke liye (Mobile number update ke baad)
      if (trigger === "update" && session) {
        return { ...token, ...session.user };
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.email) {
        await connectToDB();
        const sessionUser = await User.findOne({ email: token.email }).lean();
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
          session.user.mobile = sessionUser.mobile;
          session.user.username = sessionUser.username;
          session.user.email = sessionUser.email;
          session.user.image = sessionUser.image;
        }
      }
      return session;
    },
  },

  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,

  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? `__Secure-next-auth.session-token` : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === "production",
      }
    }
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};