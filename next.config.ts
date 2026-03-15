import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // All product images are served from /public/images/sneakers/ — no remote patterns needed.
  },
};

export default nextConfig;

