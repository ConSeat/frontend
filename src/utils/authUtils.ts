export const getAccessToken = async (): Promise<string> => {
  if (typeof window === 'undefined') {
    const { auth } = await import('@/auth');
    const session = await auth();
    console.log('server session', session?.accessToken); // TODO: 배포 후 확인&제거
    return session?.accessToken ?? '';
  } else {
    const { getSession } = await import('next-auth/react');
    const session = await getSession();
    console.log('client session', session?.accessToken); // TODO: 배포 후 확인&제거
    return session?.accessToken ?? '';
  }
};
