import * as Sentry from '@sentry/nextjs';
import ApiRequestError from '@/utils/ApiRequestError';

type SentryLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug' | 'log';

type SendLogToSentry = {
  level?: SentryLevel;
  error: Error;
};

const sendLogToSentry = ({ level = 'error', error }: SendLogToSentry) => {
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
        requestBody: requestBody ? JSON.stringify(requestBody) : '',
      });

      Sentry.captureMessage(`${errorCode ?? 'UnknownApiError'} - ${message}`);
    } else {
      const { name, message } = error;

      scope.setTags({
        name,
        message,
      });

      Sentry.captureException(error);
    }
  });
};

export default sendLogToSentry;
