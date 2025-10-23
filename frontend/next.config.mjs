/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'gptresume.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tailorme-kappa.vercel.app',
        pathname: '/**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://tailorme-kappa.vercel.app/:path*', // proxy backend
      },
    ];
  },
};

export default nextConfig;
