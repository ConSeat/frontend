import type { Method } from '@/apis/common/apiService';

interface ApiRequestErrorArg {
  errorMessage: string;
  status: number;
  endpoint: string;
  method: Method;
  requestBody?: unknown;
  errorCode?: string;
  strategy: 'toast' | 'errorBoundary';
}

class ApiRequestError extends Error {
  status: number;
  endpoint: string;
  method: Method;
  requestBody?: unknown;
  errorCode?: string;
  strategy: 'toast' | 'errorBoundary';

  constructor({
    errorMessage,
    status,
    endpoint,
    method,
    requestBody,
    errorCode,
    strategy,
  }: ApiRequestErrorArg) {
    super(errorMessage);

    this.status = status;
    this.endpoint = endpoint;
    this.method = method;
    this.requestBody = requestBody;
    this.errorCode = errorCode;
    this.strategy = strategy;
    this.name = 'ApiRequestError';
  }
}

export default ApiRequestError;
