'use client';

import clientApi from './clientApi';
import { API_ENDPOINTS } from './endpoints';
import MESSAGES from '@/constants/message';

export const postLogin = async () => {
  const { headers } = await clientApi.post({
    endpoint: API_ENDPOINTS.LOGIN,
    errorMessage: MESSAGES.ERROR.POST_LOGIN,
  });

  const accessToken = headers.get('Authorization');

  if (!accessToken) {
    throw new Error(MESSAGES.ERROR.POST_LOGIN);
  }

  return { accessToken };
};
