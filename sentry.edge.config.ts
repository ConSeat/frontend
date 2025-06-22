import * as Sentry from '@sentry/nextjs';
import { PUBLIC_ENV } from '@/config/env';

const isProd = process.env.NODE_ENV === 'production';

Sentry.init({
  dsn: PUBLIC_ENV.sentryDsn,
  tracesSampleRate: 0.1,
  sendDefaultPii: false,
  enabled: isProd, // 개발 환경에서는 전송 안 함
  debug: !isProd, // 개발에서는 debug log만 보기
});
