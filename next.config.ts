import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all https hosts
      },
    ],
    unoptimized: true, // FIX: prevents “private IP” image errors
  },
};

export default bundleAnalyzer(nextConfig);
