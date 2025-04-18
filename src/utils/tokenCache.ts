'use server';

let tokenCache: string | null = null;

export const setServerToken = async (token: string) => {
  tokenCache = token;
};

export const getAccessToken = async (): Promise<string> => {
  if (typeof window !== 'undefined') {
    // 클라이언트
    const Cookies = (await import('js-cookie')).default;
    return Cookies.get('accessToken') || '';
  }

  // 서버
  return tokenCache || '';
};
