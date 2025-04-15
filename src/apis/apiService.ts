import { PUBLIC_ENV } from './../config/env';
import MESSAGES from '@/constants/message';
import { Method } from '@/types/apiService';

interface ApiProps {
  endpoint: string;
  headers?: Record<string, string>;
  body?: object | null;
  errorMessage?: string;
}

interface ApiResponse<T> {
  data: T;
  headers: Headers;
}

interface RequestProps extends ApiProps {
  method: Method;
}

const parseResponse = async (response: Response) => {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

const createRequestInit = (
  method: Method,
  headers: Record<string, string>,
  body: object | FormData | null,
  accessToken?: string,
): RequestInit => {
  const isFormData = body instanceof FormData;

  const resolvedHeaders: Record<string, string> = {
    ...headers,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
  };

  const requestInit: RequestInit = {
    method,
    headers: resolvedHeaders,
    credentials: 'include',
  };

  if (body) {
    requestInit.body = isFormData ? body : JSON.stringify(body);
  }

  return requestInit;
};

const fetchWithToken = async <T = unknown>(
  endpoint: string,
  requestInit: RequestInit,
  errorMessage: string,
): Promise<ApiResponse<T>> => {
  const response = await fetch(PUBLIC_ENV.baseUrl + endpoint, requestInit);
  const message = response.headers.get('message');
  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(errorMessage || message || MESSAGES.ERROR.DEFAULT);
  }

  return { data: data ?? response, headers: response.headers };
};

export const apiService = (getAccessToken: () => Promise<string>) => {
  const request = async <T = unknown>({
    method,
    endpoint,
    headers = {},
    body = null,
    errorMessage = '',
  }: RequestProps): Promise<ApiResponse<T>> => {
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
