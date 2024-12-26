/** @type {import('next').NextConfig} */
const nextConfig = {
  // true: 渲染2次？
  reactStrictMode: false,
  transpilePackages: ['antd', '@ant-design/icons'],
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://localhost:4060/api/v1/:path*'
      }
    ]
  }
};

module.exports = nextConfig;
