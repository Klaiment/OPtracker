import type { NextConfig } from "next";

const config: NextConfig = {
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL
  }
};

export default config;
