/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // Increase memory limit for the build process
  experimental: {
    serverComponentsExternalPackages: []
  },
  // Optimize production builds
  compiler: {
    // removeConsole: process.env.NODE_ENV === 'production', // Keep console logs for debugging
  },
  // Configure webpack to increase memory limit
  webpack: (config) => {
    // Fix for webpack errors with recent Node versions
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
};

module.exports = nextConfig; 