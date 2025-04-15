import { PUBLIC_ENV } from './../config/env';
import MESSAGES from '@/constants/message';
import { Method } from '@/types/apiService';

interface ApiProps {
  endpoint: string;
  headers?: Record<string, string>;
  body?: object | null;
  errorMessage?: string;
}

interface RequestProps extends ApiProps {
  method: Method;
}

const createRequestInit = (
  method: Method,
  headers: Record<string, string>,
  body: object | null,
  accessToken: string,
): RequestInit => ({
  method,
  headers: {
    ...headers,
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
    'Content-Type': 'application/json',
  },
  body: body ? JSON.stringify(body) : null,
});

const fetchWithToken = async <T = unknown>(
  endpoint: string,
  requestInit: RequestInit,
  errorMessage: string,
): Promise<T> => {
  const response = await fetch(PUBLIC_ENV.baseUrl + endpoint, requestInit);
  // const message = response.headers.get('message'); TODO: message 변수명 맞추기

  if (!response.ok) {
    throw new Error(errorMessage || MESSAGES.ERROR.DEFAULT);
  }

  return response.json() as Promise<T>;
};

export const apiService = (getAccessToken: () => Promise<string>) => {
  const request = async <T = unknown>({
    method,
    endpoint,
    headers = {},
    body = null,
    errorMessage = '',
  }: RequestProps): Promise<T> => {
    const token = await getAccessToken();
    const requestInit = createRequestInit(method, headers, body, token);
    return await fetchWithToken<T>(endpoint, requestInit, errorMessage);
  };

  return {
    get: ({ endpoint, headers = {}, errorMessage = '' }: ApiProps) =>
      request({ method: 'GET', endpoint, headers, errorMessage }),

    post: ({ endpoint, headers = {}, body = {}, errorMessage = '' }: ApiProps) =>
      request({ method: 'POST', endpoint, headers, body, errorMessage }),

    put: ({ endpoint, headers = {}, body = {}, errorMessage = '' }: ApiProps) =>
      request({ method: 'PUT', endpoint, headers, body, errorMessage }),

    patch: ({ endpoint, headers = {}, body = {}, errorMessage = '' }: ApiProps) =>
      request({ method: 'PATCH', endpoint, headers, body, errorMessage }),

    delete: ({ endpoint, headers = {}, errorMessage = '' }: ApiProps) =>
      request({ method: 'DELETE', endpoint, headers, errorMessage }),
  };
};
