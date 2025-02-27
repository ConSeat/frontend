export type HallKey = keyof typeof HALL_INFO;
export type HallId = (typeof HALL_INFO)[HallKey]['id'];

export const HALL_INFO = {
  KSPO_DOME: {
    id: 'kspo-dome',
    displayName: '올림픽 체조경기장',
  },
  JAMSIL_ARENA: {
    id: 'jamsil-arena',
    displayName: '잠실 실내체육관',
  },
} as const;

export const ALL_HALL_IDS: HallId[] = Object.values(HALL_INFO).map((hall) => hall.id);
