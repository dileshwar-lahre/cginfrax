/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔥 standalone build for Hostinger deploy
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cginfrax-storage.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/rooms-in-bilaspur",
        destination: "/listing?category=Room&district=Bilaspur",
      },
      {
        source: "/rooms-in-raipur",
        destination: "/listing?category=Room&district=Raipur",
      },
      {
        source: "/pg-in-bilaspur",
        destination: "/listing?category=PG&district=Bilaspur",
      },
      {
        source: "/pg-in-raipur",
        destination: "/listing?category=PG&district=Raipur",
      },
      {
        source: "/houses-in-bilaspur",
        destination: "/listing?category=House&district=Bilaspur",
      },
      {
        source: "/houses-in-raipur",
        destination: "/listing?category=House&district=Raipur",
      },
      {
        source: "/plots-in-bilaspur",
        destination: "/listing?category=Plot&district=Bilaspur",
      },
      {
        source: "/plots-in-raipur",
        destination: "/listing?category=Plot&district=Raipur",
      },
    ];
  },
};

export default nextConfig;
