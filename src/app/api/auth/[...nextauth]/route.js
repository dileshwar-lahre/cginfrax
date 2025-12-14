import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await connectToDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user) throw new Error("User not found!");

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) throw new Error("Wrong credentials!");

        return user;
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
            const newUser = new User({
              username: user.name,
              email: user.email,
              img: user.image,
              password: "", // Google users ka password khali rahega
            });
            await newUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };