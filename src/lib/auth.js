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
          throw new Error("Missing email or password");
        }
        await connectToDB();
        try {
          const user = await User.findOne({ 
            email: credentials.email.toLowerCase().trim() 
          });
          if (!user) throw new Error("User not found");
          
          // Google users ka password hashed secret hota hai, credentials wale ka real
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordCorrect) throw new Error("Invalid credentials");
          
          return user;
        } catch (err) {
          throw new Error("Auth failed");
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
            // Security: Use NEXTAUTH_SECRET to hash the dummy password
            const dummyPassword = await bcrypt.hash(process.env.NEXTAUTH_SECRET || "fallback_secret", 10);
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
        token.email = user.email;
      }
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
        }
      }
      return session;
    },
  },

  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, 
  },
  secret: process.env.NEXTAUTH_SECRET,
  
  useSecureCookies: process.env.NODE_ENV === "production",

  cookies: {
    sessionToken: {
      // ✅ FIX: Local par 'next-auth' aur Production par '__Secure-' prefix use hoga
      name: process.env.NODE_ENV === "production" ? `__Secure-next-auth.session-token` : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === "production",
        // ✅ Live domain handling
        domain: process.env.NODE_ENV === "production" ? '.cginfrax.com' : 'localhost'
      }
    }
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
  
  debug: false, // Production mein false hi rakhna
};