import { apiService } from './apiService';
import { cookies } from 'next/headers';

export const getServerAccessToken = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore.get('accessToken')?.value || '';
};

const serverApi = apiService(getServerAccessToken);
export default serverApi;
