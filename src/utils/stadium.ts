import type { StadiumInfo } from '@/types/stadium';

/**
 * 주어진 Stadium 배열에서 id와 일치하는 Stadium을 찾아 반환합니다.
 * @param list Stadium[] | undefined
 * @param id   찾을 stadiumId
 */
export function findStadiumById(
  list: StadiumInfo[] | undefined,
  id: number,
): StadiumInfo | undefined {
  return list?.find((s) => s.stadiumId === id);
}
