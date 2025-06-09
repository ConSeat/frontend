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

export const logErrorToSentry = (error: Error) => {
  if (process.env.NODE_ENV !== 'production') return;

  if (error instanceof ApiRequestError) {
    const level = getSentryLevelByStatus(error.status);
    if (level) {
      sendLogToSentry({ error, level });
    }
  } else {
    sendLogToSentry({ error, level: 'fatal' });
  }
};
