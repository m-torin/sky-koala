/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    appDir: true,
    mdxRs: true,
  },
  env: {
    webappUrl: process.env.WEBAPP_URL,
  },
};

const withMDX = require('@next/mdx')();

module.exports = withMDX(nextConfig);
