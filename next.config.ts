import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  productionBrowserSourceMaps: false,

  experimental: {
    optimizePackageImports: ["antd", "react-icons", "@tanstack/react-query"],
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  images: {
    minimumCacheTTL: 60,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      /* { protocol: 'https', hostname: 'example.com' } */
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  poweredByHeader: false,

  async headers() {
    const isProd = process.env.NODE_ENV === "production";

    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      ...(isProd
        ? [
            {
              source: "/_next/static/:path*",
              headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
            },
          ]
        : []),
    ];
  },
};

export default nextConfig;
