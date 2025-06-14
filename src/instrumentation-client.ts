import { PUBLIC_ENV } from './config/env';
import * as Sentry from '@sentry/nextjs';

const isProd = process.env.NODE_ENV === 'production';
const isSentryEnabled = isProd && PUBLIC_ENV.sentryDsn;

if (isSentryEnabled) {
  Sentry.init({
    dsn: PUBLIC_ENV.sentryDsn,
    debug: false,
    enabled: true,
    environment: process.env.NODE_ENV,
    release: process.env.NEXT_PUBLIC_SENTRY_RELEASE || `dev-${Date.now()}`, // dev 캐시 방지
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.0,
    replaysOnErrorSampleRate: 0.1,
    sendDefaultPii: false,
  });
} else {
  // 개발환경에서는 init 호출하지 않음 → 느려짐 방지
  console.log('[Sentry] Disabled in local development');
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
