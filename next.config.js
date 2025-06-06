const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => config,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'img1.kakaocdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.youtube.com',

        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'f1.tokenpost.kr',
        port: '',
        pathname: '/**',
      },
    ],
    localPatterns: [
      {
        pathname: '/images/**',
        search: '',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
};

module.exports = withPlugins(
  [
    withBundleAnalyzer({
      compress: true,
    }),
  ],
  nextConfig,
);
