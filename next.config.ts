import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Terra-security",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/Terra-security",
  },
  images: {
    loader: "custom",
    loaderFile: "./imageLoader.ts",
  },
};

export default nextConfig;
