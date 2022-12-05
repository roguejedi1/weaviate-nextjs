/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/v1/:path*',
        destination: `https://plants.semi.network/v1/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
