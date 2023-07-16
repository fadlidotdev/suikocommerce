/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HOST_API: process.env.HOST_API,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.dummyjson.com",
        port: "",
        pathname: "/data/products/**",
      },
    ],
  },
};

module.exports = nextConfig;
