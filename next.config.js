/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React Strict Mode for development
  swcMinify: true, // Uses SWC for faster minification
  images: {
    domains: ["localhost"], // Add domains for external images if needed
  },
  env: {
    // Ensure MONGODB_URI is available client-side if needed (optional)
    MONGODB_URI: process.env.MONGODB_URI,
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // Adjust for production
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
  typescript: {
    // Enforce TypeScript checks during build
    ignoreBuildErrors: false,
  },
  eslint: {
    // Enforce ESLint checks during build
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
