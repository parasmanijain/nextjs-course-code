import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { NextConfig } from "next";

const nextConfig = (phase: string): NextConfig => {
  const env = {
    mongodb_username: "maximilian",
    mongodb_password: "2YkcXq43KyPk0vqp",
    mongodb_clustername: "cluster0",
    mongodb_database: "my-site",
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: { ...env, mongodb_database: "my-site-dev" },
    };
  }

  return {
    env,
  };
};

export default nextConfig;
