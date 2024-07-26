/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://144.91.111.46:8000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
