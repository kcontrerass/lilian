import type { NextConfig } from "next";

/** Si el sitio se sirve bajo /public/ en la URL, define NEXT_PUBLIC_BASE_PATH=/public en .env.local antes del build. */
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
const basePath = rawBasePath.startsWith("/") ? rawBasePath : rawBasePath ? `/${rawBasePath}` : "";

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath ? { basePath } : {}),
  // Carpetas /ruta/index.html — recarga fiable en Apache/cPanel con barra final
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
