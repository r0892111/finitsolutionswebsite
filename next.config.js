/** @type {import('next').NextConfig} */
// Static export (output:'export' + trailingSlash:true) is required for
// the production Netlify build, but in `next dev` it makes /intake
// route through /intake/index.html which Netlify dev's proxy can't
// resolve. Apply the export config only outside of dev.
const isDev = process.env.NODE_ENV === 'development';
const nextConfig = {
  ...(isDev ? {} : { output: 'export', trailingSlash: true }),
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

module.exports = nextConfig;