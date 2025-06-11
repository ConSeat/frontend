import * as Sentry from '@sentry/nextjs';

const isProd = process.env.NODE_ENV === 'production';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  sendDefaultPii: false,
  enabled: isProd, // 개발 환경에서는 전송 안 함
  debug: !isProd, // 개발에서는 debug log만 보기
});
