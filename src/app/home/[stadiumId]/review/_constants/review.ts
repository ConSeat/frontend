const REVIEW_ACTIONS = {
  CONCERT_SELECT: 'CONCERT_SELECT',
  SEAT_INFO_SELECT: 'SEAT_INFO_SELECT',
  FEATURES_INFO_SELECT: 'FEATURES_INFO_SELECT',
  IMAGE_UPLOAD: 'IMAGE_UPLOAD',
  IMAGE_REMOVE: 'IMAGE_REMOVE',
  DISTANCE_INFO_SELECT: 'DISTANCE_INFO_SELECT',
  OBSTRUCTIONS_SELECT: 'OBSTRUCTIONS_SELECT',
  REVIEW_INPUT: 'REVIEW_INPUT',
  SUBMIT: 'SUBMIT',
} as const;

const REVIEW_STEPS = {
  CONCERT_SELECT: 0,
  SEAT_INFO_SELECT: 1,
  FEATURES_INFO_SELECT: 2,
  IMAGE_UPLOAD: 3,
  DISTANCE_INFO_SELECT: 4,
  OBSTRUCTIONS_SELECT: 5,
  REVIEW_INPUT: 6,
  SUBMIT: 7,
} as const;

const REVIEW_MESSAGE = {
  CONCERT_SELECT: {
    TITLE: '내가 다녀온\n콘서트를 선택해주세요',
    SUBTITLE: '*영문 또는 한글로 가수명을 검색해 보세요.',
  },
  SEAT_INFO_SELECT: {
    TITLE: '좌석을 선택해주세요',
    SUBTITLE:
      '*플로어는 공연별 구역명이 상이할 수 있습니다.\n좌석표를 확인하여 본무대/돌출 기준으로 구역을 선택해주세요',
  },
  FEATURES_INFO_SELECT: {
    TITLE: '추가 좌석 정보를 선택해주세요',
    SUBTITLE: '*플로어의 경우 공연별 변동사항이 많이 발생하여,\n해당 정보가 꼭 필요해요',
  },
  IMAGE_UPLOAD: {
    TITLE: '시야 사진을 등록해주세요',
    SUBTITLE: '*방해요소, 거리감이 잘 느껴지는 사진이면 좋아요',
  },
  STAGE_DISTANCE: {
    TITLE: '본 무대와 거리는 어떤가요?',
  },
  THRUST_STAGE_DISTANCE: {
    TITLE: '돌출 무대와 거리는 어떤가요?',
  },
  SCREEN_DISTANCE: {
    TITLE: '전광판이 잘 보이나요?',
  },
  OBSTRUCTIONS_SELECT: {
    TITLE: '시야 방해가 있었나요?',
    SUBTITLE: '해당되는 내용을 모두 선택해주세요',
  },
  REVIEW_INPUT: {
    TITLE: '자유롭게 후기를 남겨주세요!',
    PLACEHOLDER:
      '추가적으로 좋았던 점, 아쉬운 점, 관람팁 등 자유롭게 작성해주세요. 구체적으로 작성할수록 다른 사람들에게 도움이 돼요!',
  },
  REVIEW_RULE: {
    TEXT: `[후기 규정]
                
    ※ 고객님의 개인 정보는 익명으로 처리되며, 개인정보보법에 기반하여 보호됩니다.
    
    ※ 해당 후기는 업로드 이후에 수정/삭제가 불가합니다. 만약 직접 촬영한 사진이 아니라면, 관리자에 의해 업로드가 제한될 수 있습니다.`,
  },
} as const;

export const REVIEW = {
  ACTIONS: REVIEW_ACTIONS,
  STEPS: REVIEW_STEPS,
  MESSAGE: REVIEW_MESSAGE,
};
