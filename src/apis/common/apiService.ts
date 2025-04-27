import { postLogin } from '../auth/auth.api';
import { PUBLIC_ENV } from '@/config/env';
import MESSAGES from '@/constants/message';
import { redirectToSignin, setAccessToken } from '@/utils/authUtils';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface PendingRequest {
  resolve: (value: string | PromiseLike<string>) => void;
  reject: (reason?: Error) => void;
}

interface ApiProps {
  endpoint: string;
  headers?: Record<string, string>;
  body?: object | null;
  errorMessage?: string;
}

interface RequestProps extends ApiProps {
  method: Method;
}

interface ApiResponse<T> {
  data: {
    header: { message: string };
    body: T;
  };
  headers: Headers;
}

let isRefreshing = false;
let pendingRequests: PendingRequest[] = [];

const processPendingRequests = (error: Error | null = null, token: string | null = null) => {
  pendingRequests.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });
  pendingRequests = [];
};

const parseResponse = async (response: Response) => {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

export const refreshAccessToken = async (): Promise<string> => {
  try {
    const { accessToken } = await postLogin();

    setAccessToken(accessToken);
    processPendingRequests(null, accessToken);

    return accessToken;
  } catch {
    const authorizationError = new Error(MESSAGES.ERROR.POST_LOGIN);
    processPendingRequests(authorizationError, null);

    redirectToSignin();

    throw authorizationError;
  } finally {
    isRefreshing = false;
  }
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
  if (!navigator.onLine) {
    throw new Error(MESSAGES.ERROR.OFFLINE_ACTION);
  }

  let response = await fetch(PUBLIC_ENV.baseUrl + endpoint, requestInit);
  let data = await parseResponse(response);

  if (response.status === 401) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({ resolve, reject });
      }).then(async (token) => {
        // 새로운 Access Token으로 pending 요청 실행
        requestInit.headers = {
          ...requestInit.headers,
          Authorization: `Bearer ${token}`,
        };

        response = await fetch(PUBLIC_ENV.baseUrl + endpoint, requestInit);
        data = await parseResponse(response);

        if (!response.ok) {
          throw new Error(errorMessage || MESSAGES.ERROR.DEFAULT);
        }

        return { data: data ?? response, headers: response.headers };
      });
    }

    isRefreshing = true;
    const newAccessToken = await refreshAccessToken();

    requestInit.headers = {
      ...requestInit.headers,
      Authorization: `Bearer ${newAccessToken}`,
    };

    response = await fetch(PUBLIC_ENV.baseUrl + endpoint, requestInit);
    data = await parseResponse(response);

    if (!response.ok) {
      throw new Error(errorMessage || MESSAGES.ERROR.DEFAULT);
    }
  }

  if (!response.ok) {
    throw new Error(errorMessage || MESSAGES.ERROR.DEFAULT);
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
    get: <T = unknown>(args: ApiProps) => request<T>({ ...args, method: 'GET' }),
    post: <T = unknown>(args: ApiProps) => request<T>({ ...args, method: 'POST' }),
    put: <T = unknown>(args: ApiProps) => request<T>({ ...args, method: 'PUT' }),
    patch: <T = unknown>(args: ApiProps) => request<T>({ ...args, method: 'PATCH' }),
    delete: <T = unknown>(args: ApiProps) => request<T>({ ...args, method: 'DELETE' }),
  };
};
