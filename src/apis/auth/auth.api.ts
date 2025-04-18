'use client';

import { API_ENDPOINTS } from '../common/endpoints';
import MESSAGES from '@/constants/message';

export type SocialType = 'google' | 'kakao' | 'twitter';

export const postLogin = async () => {
  const { headers } = await publicApi.post({
    endpoint: API_ENDPOINTS.LOGIN,
    errorMessage: MESSAGES.ERROR.POST_LOGIN,
  });

  const accessToken = headers.get('Authorization');

  if (!accessToken) {
    throw new Error(MESSAGES.ERROR.POST_LOGIN);
  }

  return { accessToken };
};
