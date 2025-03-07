import { ALL_STADIUM_INFO } from '@/constants/stadium';

export const stadiumDisplayName = (stadiumId: number): string => {
  const stadium = ALL_STADIUM_INFO.find((stadium) => stadium.stadiumId === stadiumId);
  return stadium?.name ?? '알 수 없음';
};
