import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  basePath: isProd ? "/full-stack-short-coures" : "",
  assetPrefix: isProd ? "/full-stack-short-coures/" : "",
};

export default nextConfig;