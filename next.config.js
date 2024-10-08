/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "placehold.co",
        },
        {
          protocol: "https",
          hostname: "replicate.com",
        },
        {
          protocol: "https",
          hostname: "replicate.delivery",
        },
        {
          protocol: "https",
          hostname: "firebasestorage.googleapis.com",
        },
        {
          protocol: "https",
          hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
        },
      ],
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: "https://api.openai.com/:path*",
        },
      ];
    },
    webpack: (config) => {
      config.resolve.alias['@'] = require('path').resolve(__dirname, 'src')
      return config
    },
  };
  
  module.exports = nextConfig;