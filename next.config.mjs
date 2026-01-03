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
    // Agar private IP ka panga phir bhi aaye toh ye line add kar dena
    unoptimized: true, 
  },
};

export default nextConfig;