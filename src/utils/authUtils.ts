import type { Session } from 'next-auth';

let clientSessionPromise: Promise<Session | null> | null = null;

async function getClientSession(): Promise<Session | null> {
  if (!clientSessionPromise) {
    const { getSession } = await import('next-auth/react');
    clientSessionPromise = getSession();
  }
  return clientSessionPromise;
}

export const getAccessToken = async (): Promise<string> => {
  if (typeof window === 'undefined') {
    const { auth } = await import('@/auth');
    const session = await auth();
    console.log('server session', session?.accessToken); // TODO: 배포 후 확인&제거
    return session?.accessToken ?? '';
  } else {
    const session = await getClientSession();
    console.log('client session', session?.accessToken); // TODO: 배포 후 확인&제거
    return session?.accessToken ?? '';
  }
};
