/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/**', // Adjust as needed to match the specific paths for your images
      },
    ],
  },
};

module.exports = nextConfig;
