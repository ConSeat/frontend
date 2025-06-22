import * as Sentry from '@sentry/nextjs';
import ApiRequestError from '@/utils/ApiRequestError';

type SentryLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug' | 'log';

type SendLogToSentry = {
  level?: SentryLevel;
  error: Error;
};

// 중복 전송 방지용
const sentErrorSet = new WeakSet<Error>();

const sendLogToSentry = ({ level = 'error', error }: SendLogToSentry) => {
  if (sentErrorSet.has(error)) return;
  sentErrorSet.add(error);

  Sentry.withScope((scope) => {
    scope.setLevel(level);
    scope.setTag('environment', process.env.NODE_ENV ?? 'unknown');
    scope.setTag('error_source', 'global_error_capture');
    scope.setTag('page_url', window.location.href);

    if (error instanceof ApiRequestError) {
      const { status, endpoint, method, requestBody, errorCode, strategy, message } = error;

      scope.setTags({
        api_status: status.toString(),
        api_endpoint: endpoint,
        api_method: method,
        api_strategy: strategy,
        errorCode: errorCode ?? '',
      });

      scope.setContext('api', {
        status: status.toString(),
        endpoint,
        method,
        strategy,
        errorCode,
        requestBody: requestBody ? JSON.stringify(requestBody) : '',
      });

      scope.setExtra('custom_message', message);

      Sentry.captureException(error);
    } else {
      scope.setTags({
        name: error.name,
        message: error.message,
      });

      Sentry.captureException(error);
    }
  });
};

export default sendLogToSentry;
