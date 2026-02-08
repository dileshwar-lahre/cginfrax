import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth({
  ...authOptions,
  // ✅ LIVE FIX: Hostinger ko batana padta hai ki ye server origin hai
  callbacks: {
    ...authOptions.callbacks,
    async redirect({ url, baseUrl }) {
      // Force redirect to WWW version if that's what you use
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };