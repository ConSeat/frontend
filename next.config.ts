import withPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production'; // 배포 버전에만 PWA 활성화

const pwaConfig = withPWA({
  dest: 'public',
  disable: !isProd,
  runtimeCaching,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  images: {
    domains: ['conseat.s3.ap-northeast-2.amazonaws.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: { svgo: false },
        },
      ],
    });
    return config;
  },
};

export default pwaConfig(nextConfig);
