import type { SocialType } from '../auth/auth.api';

export const API_ENDPOINTS = {
  // auth
  SOCIAL_LOGIN: (socialType: SocialType) => `/auth/login/${socialType}`,
  LOGIN: '/auth/login',

  // stadium
  STADIUMS: '/stadiums',
};
