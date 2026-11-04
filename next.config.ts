import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Una carpeta por ruta (index.html). Evita 403 en LiteSpeed al recargar con /
  trailingSlash: true,
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
