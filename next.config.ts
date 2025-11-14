// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  //  FORCE RESET ANY OLD BASE PATH
  basePath: "",
  assetPrefix: "",
};

export default nextConfig;
