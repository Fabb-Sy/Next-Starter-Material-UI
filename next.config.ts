import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  reactStrictMode: false,
  env: {
    API_SERVER_URL: process.env.API_SERVER_URL,
    APP_URL: process.env.APP_URL,
  },

  /* config options here */
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(nextConfig);
