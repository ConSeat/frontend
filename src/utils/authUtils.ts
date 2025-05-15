let tokenCache: { token: string; timestamp: number } | null = null;
const TOKEN_TTL = 10 * 60 * 1000; // 10분 (ms 단위)

export const getAccessToken = async (): Promise<string> => {
  if (typeof window === 'undefined') {
    const { auth } = await import('@/auth');
    const session = await auth();
    return session?.accessToken ?? '';
  } else {
    const now = Date.now();

    if (tokenCache && now - tokenCache.timestamp < TOKEN_TTL) {
      return tokenCache.token;
    }

    const { getSession } = await import('next-auth/react');
    const session = await getSession();
    const token = session?.accessToken ?? '';

    tokenCache = {
      token,
      timestamp: now,
    };

    return token;
  }
};
