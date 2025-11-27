import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Modern React optimization
  reactCompiler: true,

  // Remove source maps from production
  productionBrowserSourceMaps: false,

  // Recommended for catching mistakes (does not impact prod)
  reactStrictMode: true,

  // Remove console.log in production bundles
  compiler: {
    removeConsole: {
      exclude: ["error"], // keep console.error
    },
  },

  // Image optimization defaults
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "elnufihppvzmjtggezyn.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // Enable Brotli/Gzip compression
  compress: true,

  // Enable stable Next.js 16 optimizations
  experimental: {
    optimizePackageImports: ["lucide-react", "lodash"],
  },

  poweredByHeader: false,
}

export default nextConfig;