import * as Sentry from '@sentry/nextjs';

const isProd = process.env.NODE_ENV === 'production';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: isProd, // 개발 환경에서는 전송 안 함
  debug: !isProd, // 개발에서는 debug log만 보기
  environment: process.env.NODE_ENV,
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE || 'dev',
  tracesSampleRate: isProd ? 0.1 : 0, // 성능 트레이싱
  replaysSessionSampleRate: 0.0, // Session Replay
  replaysOnErrorSampleRate: isProd ? 0.1 : 0.0,
  sendDefaultPii: false, // 개인정보는 기본 off → setUser로 명시적 설정만 허용
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
