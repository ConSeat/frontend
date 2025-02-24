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

const fetchWithToken = async (
  endpoint: string,
  requestInit: RequestInit,
  errorMessage: string = MESSAGES.ERROR.DEFAULT,
) => {
  if (!navigator.onLine) {
    throw new Error(MESSAGES.ERROR.OFFLINE);
  }

  const response = await fetch('endpoints', requestInit); // TODO: endpoint 추가
  const message = response.headers.get('message'); // TODO: message 변수명 맞추기

  if (!response.ok) {
    throw new Error(message || errorMessage);
  }

  return response.json();
};

const createRequestInit = (
  method: Method,
  headers: Record<string, string>,
  body: object | null,
): RequestInit => {
  const token = 'access token'; // TODO: Access token 추가
  return {
    method,
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
    credentials: 'include',
  };
};

const clientApi = {
  get: ({ endpoint, headers = {}, errorMessage = '' }: ApiProps) =>
    clientApi.request({ method: 'GET', endpoint, headers, errorMessage }),

  post: ({ endpoint, headers = {}, body = {}, errorMessage = '' }: ApiProps) =>
    clientApi.request({ method: 'POST', endpoint, headers, body, errorMessage }),

  put: ({ endpoint, headers = {}, body = {}, errorMessage = '' }: ApiProps) =>
    clientApi.request({ method: 'PUT', endpoint, headers, body, errorMessage }),

  patch: ({ endpoint, headers = {}, body = {}, errorMessage = '' }: ApiProps) =>
    clientApi.request({ method: 'PATCH', endpoint, headers, body, errorMessage }),

  delete: ({ endpoint, headers = {}, errorMessage = '' }: ApiProps) =>
    clientApi.request({ method: 'DELETE', endpoint, headers, errorMessage }),

  request: async ({
    method,
    endpoint,
    headers = {},
    body = null,
    errorMessage = '',
  }: RequestProps) => {
    const requestInit = createRequestInit(method, headers, body);
    return await fetchWithToken(endpoint, requestInit, errorMessage);
  },
};

export default clientApi;
