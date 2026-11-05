import type { NextConfig } from "next";

/** cPanel: `npm run build:static`. Vercel: `npm run build` (proxy API, sin export). */
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
const basePath = rawBasePath.startsWith("/")
  ? rawBasePath
  : rawBasePath
    ? `/${rawBasePath}`
    : "";

const isStaticExport = process.env.NEXT_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" as const } : {}),
  ...(basePath ? { basePath } : {}),
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_WP_PROXY: isStaticExport ? "0" : "1",
  },
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "panlilian.com" },
      { protocol: "https", hostname: "www.panlilian.com" },
      { protocol: "https", hostname: "lilianpanaderia.local" },
      { protocol: "http", hostname: "lilianpanaderia.local" },
    ],
  },
};

export default nextConfig;
