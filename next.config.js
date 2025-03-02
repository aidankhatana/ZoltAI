/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // Increase memory limit for the build process
  experimental: {
    largePageDataBytes: 512 * 1000, // 512KB
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configure webpack to increase memory limit
  webpack: (config, { isServer }) => {
    // Increase memory limit for webpack
    config.performance = {
      hints: false, // Don't throw warnings on large bundles
      maxEntrypointSize: 512000, // 500KB
      maxAssetSize: 512000, // 500KB
    };
    return config;
  },
};

module.exports = nextConfig; 