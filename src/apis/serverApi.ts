import { cookies } from 'next/headers';
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

const fetchWithToken = async (endpoint: string, requestInit: RequestInit, errorMessage: string) => {
  const response = await fetch(endpoint, requestInit); // TODO: endpoint base url 추가
  // const message = response.headers.get('message'); TODO: message 변수명 맞추기
  console.log(response);

  if (!response.ok) {
    throw new Error(errorMessage || MESSAGES.ERROR.DEFAULT);
  }

  return response.json();
};

const createRequestInit = async (
  method: Method,
  headers: Record<string, string>,
  body: object | null,
): Promise<RequestInit> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value as string;

  return {
    method,
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  };
};

const serverApi = {
  get: ({ endpoint, headers = {}, errorMessage = '' }: ApiProps) =>
    serverApi.request({ method: 'GET', endpoint, headers, errorMessage }),

  post: ({ endpoint, headers = {}, body = {}, errorMessage = '' }: ApiProps) =>
    serverApi.request({ method: 'POST', endpoint, headers, body, errorMessage }),

  put: ({ endpoint, headers = {}, body = {}, errorMessage = '' }: ApiProps) =>
    serverApi.request({ method: 'PUT', endpoint, headers, body, errorMessage }),

  patch: ({ endpoint, headers = {}, body = {}, errorMessage = '' }: ApiProps) =>
    serverApi.request({ method: 'PATCH', endpoint, headers, body, errorMessage }),

  delete: ({ endpoint, headers = {}, errorMessage = '' }: ApiProps) =>
    serverApi.request({ method: 'DELETE', endpoint, headers, errorMessage }),

  request: async ({
    method,
    endpoint,
    headers = {},
    body = null,
    errorMessage = '',
  }: RequestProps) => {
    const requestInit = await createRequestInit(method, headers, body);
    return await fetchWithToken(endpoint, requestInit, errorMessage);
  },
};

export default serverApi;
