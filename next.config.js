/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    API_ACCESS_TOKEN: process.env.API_ACCESS_TOKEN,
  },
};

module.exports = nextConfig;
