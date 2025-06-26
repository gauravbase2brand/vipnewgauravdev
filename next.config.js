const nextConfig = {
  compress: true,
  reactStrictMode: false,
  poweredByHeader: false,
  experimental: {
    optimizeCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "leafymango.com",
      },
      {
        protocol: "https",
        hostname: "www.vipnumbershop.com",
      },
      // {
      //   protocol: "https",
      //   hostname: "admin.leafymango.com",
      // },
      {
        protocol: "https",
        hostname: "newadmin.leafymango.com",
      },
      {
        protocol: "https",
        hostname: "d3re4dy3egxmsz.cloudfront.net",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint during production builds on Vercel
  },
};

module.exports = nextConfig;
