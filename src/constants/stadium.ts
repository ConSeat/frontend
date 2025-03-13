export const STADIUM_INFO = {
  active: [
    {
      stadiumId: 1,
      name: 'KSPO DOME (올림픽 체조경기장)',
      image: '/images/kspo-dome.jpg',
    },
  ],
  inactive: [
    {
      stadiumId: 2,
      name: '잠실 실내체육관',
      image: '/images/jamsil-arena.jpg',
    },
    {
      stadiumId: 3,
      name: '고척 스카이돔',
      image: '/images/gocheok-dome.jpg',
    },
    {
      stadiumId: 4,
      name: 'SK 핸드볼 경기장',
      image: '/images/sk-handball.jpg',
    },
  ],
} as const;

export const ALL_STADIUM_INFO = [...STADIUM_INFO.active, ...STADIUM_INFO.inactive];
