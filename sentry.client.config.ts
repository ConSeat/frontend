import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  sendDefaultPii: false, // 개인정보 false, 보내고 싶은 개인 정보는 /members 조회 시 setUser
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
