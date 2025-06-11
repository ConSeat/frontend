import sendLogToSentry from './sendLogToSentry';
import ApiRequestError from '@/utils/ApiRequestError';

type SentryLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug' | 'log';

const getSentryLevelByStatus = (status: number): SentryLevel | null => {
  if (status === 401) return null;
  if (status === 500) return 'fatal';
  if (status === 403 || status === 404) return 'warning';
  if (status === 400) return 'debug';
  if (status >= 500) return 'fatal';
  return 'warning';
};

// Sentry 중복 전송 방지용 WeakSet
// ErrorCapture → throw → GlobalError 흐름에서 logError가 두 번 호출되는 케이스가 있어 방지합니다.
const sentErrorSet = new WeakSet<Error>();

export const logError = (error: Error) => {
  if (process.env.NODE_ENV !== 'production') return;

  if (sentErrorSet.has(error)) return;
  sentErrorSet.add(error);

  if (error instanceof ApiRequestError) {
    const level = getSentryLevelByStatus(error.status);
    if (level) {
      sendLogToSentry({ error, level });
    }
  } else {
    sendLogToSentry({ error, level: 'fatal' });
  }
};
