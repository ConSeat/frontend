import * as Sentry from '@sentry/nextjs';

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [Sentry.replayIntegration()],

  // Tracing → 전체 요청 중 일부만 추적 (0.1 → 10% 샘플링)
  tracesSampleRate: isProd ? 0.1 : isDev ? 1.0 : 0.0,

  // Replay → 운영에서는 session replay 꺼두고, 에러 발생 시만 기록 (1.0 → 100%)
  replaysSessionSampleRate: 0.0,
  replaysOnErrorSampleRate: isProd ? 1.0 : 0.0,

  // 개인정보 기본 off → 필요하면 Sentry.setUser()로 명시적으로 설정
  sendDefaultPii: false,

  // 디버그 로그 → 개발에서는 켜고, 운영에서는 끔
  debug: !isProd,

  environment: process.env.NODE_ENV,
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE || 'dev',
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
