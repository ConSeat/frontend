import { API_ENDPOINTS } from '../common/endpoints';
import api from '../common/universalApi';
import { PUBLIC_ENV } from '@/config/env';
import MESSAGES from '@/constants/message';

export type SocialType = 'google' | 'kakao' | 'twitter';

// --- 소셜 로그인 URL 생성 함수 ---
export const socialLogin = (socialType: SocialType) => {
  return `${PUBLIC_ENV.baseUrl}${API_ENDPOINTS.SOCIAL_LOGIN(socialType)}`;
};

export const postLogin = async () => {
  const { headers } = await api.post({
    endpoint: API_ENDPOINTS.LOGIN,
    errorMessage: MESSAGES.ERROR.POST_LOGIN,
  });

  const accessToken = headers.get('Authorization');

  if (!accessToken) {
    throw new Error(MESSAGES.ERROR.POST_LOGIN);
  }

  return { accessToken };
};

export const postLogout = async () => {
  await api.post({
    endpoint: API_ENDPOINTS.LOGOUT,
    errorMessage: MESSAGES.ERROR.POST_LOGOUT,
  });
};
