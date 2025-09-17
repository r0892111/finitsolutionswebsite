const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: [
      'images.pexels.com',
      'upload.wikimedia.org',
      'logos-world.net',
      'www.teamleader.eu'
    ]
  },
  typescript: {
    ignoreBuildErrors: false // Enable TypeScript error checking
  },
  eslint: {
    ignoreDuringBuilds: false // Enable ESLint checking
  },
  experimental: {
    esmExternals: false
  },
  // Add webpack configuration to handle cache issues
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename]
        }
      };
    }
    return config;
  }
};

module.exports = withNextIntl(nextConfig);