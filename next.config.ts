import type { NextConfig } from 'next';

const nextConfig = (phase: string): NextConfig => {
  const env = {
    mongodb_username: "paras",
    mongodb_password: "kFYLtaL5s0tYdiJm",
    mongodb_clustername: "cluster0",
    mongodb_database: "blog",
    mongodb_appname: "Cluster0",
  };

  return {
    env,
    reactStrictMode: true,
  };
};

export default nextConfig;
