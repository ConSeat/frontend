export const NONE = '없음';

export const additionalInfoArray = [
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

export const viewBlockInfoArray = [
  '카메라에 가려요',
  '펜스 방해가 있어요',
  '단차가 있어요',
  '스키퍼에 가려요',
  NONE,
] as const;

export const REVIEW = {
  ACTIONS: {
    CONCERT_SELECT: 'CONCERT_SELECT',
    SEAT_INFO_SELECT: 'SEAT_INFO_SELECT',
    ADDITIONAL_INFO_SELECT: 'ADDITIONAL_INFO_SELECT',
    IMAGE_UPLOAD: 'IMAGE_UPLOAD',
    RATING_INFO_SELECT: 'RATING_INFO_SELECT',
    VIEW_BLOCK_SELECT: 'VIEW_BLOCK_SELECT',
    REVIEW_INPUT: 'REVIEW_INPUT',
  } as const,

  STEP: {
    CONCERT_SELECT: 0,
    SEAT_INFO_SELECT: 1,
    ADDITIONAL_INFO_SELECT: 2,
    IMAGE_UPLOAD: 3,
    RATING_INFO_SELECT: 4,
    VIEW_BLOCK_SELECT: 5,
    REVIEW_INPUT: 6,
    SUBMIT: 7,
  } as const,
};
