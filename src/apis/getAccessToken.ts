import { isServer } from '@tanstack/react-query';

export const getAccessToken = async (): Promise<string> => {
  if (isServer) {
    const mod = await import('./getAccessToken.server');
    return mod.getAccessToken();
  } else {
    const mod = await import('./getAccessToken.client');
    return mod.getAccessToken();
  }
};
