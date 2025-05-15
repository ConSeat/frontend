let tokenCache: string | null = null;

export const getAccessToken = async (): Promise<string> => {
  if (typeof window === 'undefined') {
    const { auth } = await import('@/auth');
    const session = await auth();
    return session?.accessToken ?? '';
  } else {
    if (tokenCache) {
      return tokenCache;
    }
    const { getSession } = await import('next-auth/react');
    const session = await getSession();
    tokenCache = session?.accessToken ?? '';
    return tokenCache;
  }
};
