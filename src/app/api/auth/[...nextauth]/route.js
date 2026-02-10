import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// ✅ NextAuth ko simple rakho, saari configuration 'lib/auth.js' se aayegi
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };