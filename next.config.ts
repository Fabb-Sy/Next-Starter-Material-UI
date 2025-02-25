import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  reactStrictMode: false,
  env: {
    API_SERVER_URL: process.env.API_SERVER_URL,
    APP_URL: process.env.APP_URL,
  },

  async rewrites() {
    return [
      // Next Auth routes with explicit handling
      {
        source: '/api/auth/:slug*',
        has: [
          {
            type: 'query',
            key: 'nextauth',
          },
        ],
        destination: '/api/auth/:slug*',
      },
      // Session endpoint specific handling
      {
        source: '/api/auth/session',
        destination: '/api/auth/session',
      },
      {
        source: '/api/auth/signout',
        destination: '/api/auth/signout',
      },
      {
        source: '/api/auth/csrf',
        destination: '/api/auth/csrf',
      },
      {
        source: '/api/auth/providers',
        destination: '/api/auth/providers',
      },
      {
        source: '/api/auth/signin/google/',
        destination: '/api/auth/signin/google/',
      },
      {
        source: '/api/auth/callback/google/',
        destination: '/api/auth/callback/google/',
      },
      {
        source: '/api/:path*',
        destination: `${process.env.API_SERVER_URL}/:path*`,
      }
    ];
  },

  /* config options here */
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(nextConfig);
