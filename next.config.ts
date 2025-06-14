import { withSentryConfig } from '@sentry/nextjs';
import withPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

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

    config.module.rules.push({
      test: /\.webm$/,
      type: 'asset/resource',
    });

    return config;
  },
};

export default withSentryConfig(pwaConfig(nextConfig), {
  org: 'conseat',
  project: 'javascript-nextjs',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
  disableLogger: true,
  automaticVercelMonitors: true,
});
