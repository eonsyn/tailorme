// this is my next.config.mjs file can i write here 
/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },{
        protocol: 'https',
        hostname: 'gptresume.vercel.app', 
        pathname: '/**',
      },{
        protocol:'https',
        hostname:'tailorme-kappa.vercel.app',
        pathname:'/**',
      }
    ],
  },
};

export default nextConfig;
