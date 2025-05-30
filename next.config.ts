import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env:{
    MONGODB_URI:"mongodb+srv://dev-api:gG4UBAStH0vCkbEM@myapplication.eclf7il.mongodb.net",
  }
};

export default nextConfig;
