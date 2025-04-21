import { getAccessToken } from './getAccessToken';

const isLoggedIn = async (): Promise<boolean> => {
  const accessToken = await getAccessToken();
  if (!accessToken) return false;

  return true;
};

export const requireLogin = async (action: () => void): Promise<void> => {
  const isLogin = await isLoggedIn();

  if (isLogin) {
    action();
  } else {
    throw new Error('LoginRequired');
  }
};
