import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        // Google Drive / Google Photos image CDN
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        // Google Drive direct download links
        protocol: 'https',
        hostname: 'drive.google.com',
      },
    ],
  },
};

export default nextConfig;

