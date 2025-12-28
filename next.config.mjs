/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Images Config (Jo pehle se tha)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  // 2. CORS Headers (Ye naya hai Mobile App ke liye)
  async headers() {
    return [
      {
        // Iska matlab hai ki /api/ ke aage kuch bhi ho, uspar ye rule lagega
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // '*' ka matlab sabko allow karega (App/Postman etc.)
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};

export default nextConfig;