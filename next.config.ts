import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "panlilian.com",
      },
      {
        protocol: "https",
        hostname: "www.panlilian.com",
      },
      {
        protocol: "https",
        hostname: "lilianpanaderia.local",
      },
      {
        protocol: "http",
        hostname: "lilianpanaderia.local",
      },
    ],
  },
};

export default nextConfig;
