import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.easydonate.ru',
      }
    ]
  }
};

export default nextConfig;
