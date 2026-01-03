import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Lib se import kiya

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };