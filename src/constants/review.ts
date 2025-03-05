export const NONE = '없음';
export const FLOOR = 'FLOOR';
export const NONE_SELECT = 0;

export const ADDITIONAL_INFO = [
  '돌출',
  '돌돌출',
  '돌출없음',
  '토롯코',
  '360',
  '통로',
  '의탠딩',
  '스탠딩',
  '시제석',
] as const;

export const VIEW_BLOCK_INFO = [
  '카메라에 가려요',
  '펜스 방해가 있어요',
  '단차가 있어요',
  '스키퍼에 가려요',
  NONE,
] as const;

const REVIEW_ACTIONS = {
  CONCERT_SELECT: 'CONCERT_SELECT',
  SEAT_INFO_SELECT: 'SEAT_INFO_SELECT',
  ADDITIONAL_INFO_SELECT: 'ADDITIONAL_INFO_SELECT',
  IMAGE_UPLOAD: 'IMAGE_UPLOAD',
  RATING_INFO_SELECT: 'RATING_INFO_SELECT',
  VIEW_BLOCK_SELECT: 'VIEW_BLOCK_SELECT',
  REVIEW_INPUT: 'REVIEW_INPUT',
  SUBMIT: 'SUBMIT',
} as const;

const REVIEW_STEPS = {
  CONCERT_SELECT: 0,
  SEAT_INFO_SELECT: 1,
  ADDITIONAL_INFO_SELECT: 2,
  IMAGE_UPLOAD: 3,
  RATING_INFO_SELECT: 4,
  VIEW_BLOCK_SELECT: 5,
  REVIEW_INPUT: 6,
  SUBMIT: 7,
} as const;

const REVIEW_MESSAGE = {
  CONCERT_SELECT: {
    TITLE: '내가 다녀온\n콘서트를 선택해주세요',
    SUBTITLE: '*영문 또는 한글로 가수명을 검색해 보세요.',
    PLACEHOLDER: '층을 선택해주세요',
  },
  SEAT_INFO_SELECT: {
    TITLE: '좌석을 선택해주세요',
    SUBTITLE:
      '*플로어는 공연별 구역명이 상이할 수 있습니다.\n좌석표를 확인하여 본무대/돌출 기준으로 구역을 선택해주세요',
  },
  ADDITIONAL_INFO_SELECT: {
    TITLE: '추가 좌석 정보를 선택해주세요',
    SUBTITLE: '*플로어의 경우 공연별 변동사항이 많이 발생하여,\n해당 정보가 꼭 필요해요',
  },
  IMAGE_UPLOAD: {
    TITLE: '시야 사진을 등록해주세요',
    SUBTITLE: '*방해요소, 거리감이 잘 느껴지는 사진이면 좋아요',
  },
  RATING_INFO_SELECT: {
    QUESTIONS: [
      '본 무대와 거리는 어떤가요?',
      '돌출 무대와 거리는 어떤가요?',
      '전광판이 잘 보이나요?',
    ],
  },
  VIEW_BLOCK_SELECT: {
    TITLE: '시야 방해가 있었나요?',
    SUBTITLE: '해당되는 내용을 모두 선택해주세요',
  },
  REVIEW_INPUT: {
    TITLE: '자유롭게 후기를 남겨주세요!',
    PLACEHOLDER:
      '추가적으로 좋았던 점, 아쉬운 점, 관람팁 등을자유롭게 작성해주세요. 구체적으로 작성할 수록 다른 사람들에게 도움이 돼요!',
  },
};

export const REVIEW = {
  ACTIONS: REVIEW_ACTIONS,
  STEPS: REVIEW_STEPS,
  MESSAGE: REVIEW_MESSAGE,
};
