import { cookies } from 'next/headers';

export const getAccessToken = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore.get('accessToken')?.value || '';
};
