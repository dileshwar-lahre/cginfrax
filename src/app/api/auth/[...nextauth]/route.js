import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// ✅ NextAuth handler with proper error handling
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };