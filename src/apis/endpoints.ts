import type { SocialType } from '@/types/auth';

export const API_ENDPOINTS = {
  // auth
  SOCIAL_LOGIN: (socialType: SocialType) => `/auth/login/${socialType}`,
  LOGIN: '/auth/login',
};
