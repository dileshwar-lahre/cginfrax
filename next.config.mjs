/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cginfrax-storage.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Production mein image optimization enable rahega
    // Agar development mein issue aaye toh temporarily unoptimized: true kar sakte ho
    // unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;