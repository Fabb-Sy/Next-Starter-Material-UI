import withBundleAnalyzer from '@next/bundle-analyzer';

const config = {
  /* config options here */
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(config);
