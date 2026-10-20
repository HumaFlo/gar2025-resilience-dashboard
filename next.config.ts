import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath = isGitHubPagesBuild
  ? "/gar2025-resilience-dashboard"
  : "";

const nextConfig: NextConfig = {
  output: isGitHubPagesBuild ? "export" : "standalone",
  basePath: githubPagesBasePath,
  ...(isGitHubPagesBuild ? { trailingSlash: true, images: { unoptimized: true } } : {}),
  devIndicators: false,
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
