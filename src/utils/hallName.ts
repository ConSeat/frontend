import { HALL_INFO } from '@/constants/hallName';

export const getDisplayName = (id: string) => {
  const hall = Object.values(HALL_INFO).find((h) => h.id === id);
  return hall ? hall.displayName : '알 수 없는 경기장';
};
