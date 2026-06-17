import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const githubPagesRepo = process.env.GITHUB_PAGES_REPO ?? "suanle-me";
const githubPagesBasePath = `/${githubPagesRepo}`;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? githubPagesBasePath : undefined,
  trailingSlash: isGitHubPages,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "recharts"],
  },
  headers: isGitHubPages
    ? undefined
    : async () => [
        {
          source: "/(.*)",
          headers: [
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            {
              key: "Referrer-Policy",
              value: "strict-origin-when-cross-origin",
            },
          ],
        },
        {
          source: "/sw.js",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=0, must-revalidate",
            },
          ],
        },
      ],
};

export default nextConfig;
