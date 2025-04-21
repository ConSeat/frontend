import type { SocialType } from '../auth/auth.api';

export const API_ENDPOINTS = {
  // auth
  SOCIAL_LOGIN: (socialType: SocialType) => `/auth/login/${socialType}`,
  LOGIN: '/auth/login',

  // stadium
  STADIUMS: '/stadiums',
  STADIUM_CONCERTS: (stadiumId: number, query?: string) =>
    `/stadiums/${stadiumId}/concerts${query ? `?query=${encodeURIComponent(query)}` : ''}`,
  STADIUM_SEATS: (stadiumId: number) => `/stadiums/${stadiumId}`,
  STADIUM_FEATURES: '/stadiums/features',
  STADIUM_OBSTRUCTIONS: '/stadiums/obstructions',
};
