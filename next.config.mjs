/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Rewrites to handle module routing
  async rewrites() {
    return [
      {
        source: '/careers/:path*',
        destination: '/careers',
      },
      {
        source: '/readiness/:path*',
        destination: '/readiness',
      },
      {
        source: '/resume/:path*',
        destination: '/resume',
      },
    ];
  },
};

export default nextConfig;
