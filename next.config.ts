import type { NextConfig } from 'next';
import BundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZE === 'true',
});

export default withBundleAnalyzer({
  // true: 渲染2次？
  reactStrictMode: false,
  // ------------------------------------
  transpilePackages: ['antd', '@ant-design/icons', 'lodash'],
  // ------------------------------------
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://localhost:4060/api/v1/:path*',
      },
    ];
  },
  // babel 模式
  // ------------------------------------
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.optimization.splitChunks = {
  //       chunks: 'all',
  //       cacheGroups: {
  //         vendor: {
  //           test: /[\\/]node_modules[\\/](antd|@ant-design|lodash-es)[\\/]/,
  //           name: 'vendors',
  //           chunks: 'all',
  //         },
  //       },
  //     };
  //   }
  //   return config;
  // },
} as NextConfig);
