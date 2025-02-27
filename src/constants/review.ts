export const CONCERT_SELECT = 'CONCERT_SELECT';
export const SEAT_INFO_SELECT = 'SEAT_INFO_SELECT';
export const ADDITIONAL_INFO_SELECT = 'ADDITIONAL_INFO_SELECT';
export const IMAGE_UP_LOAD = 'IMAGE_UP_LOAD';
export const SUMMARY_INFO_SELECT = 'SUMMARY_INFO_SELECT';
export const VIEW_BLOCK_SELECT = 'VIEW_BLOCK_SELECT';
export const REVIEW_INPUT = 'REVIEW_INPUT';
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

export enum ReviewStep {
  ConcertSelect,
  SeatInfoSelect,
  AdditionalInfoSelect,
  ImageUpload,
  SummaryInfoSelect,
  viewBlockSelect,
  reviewInput,
  submit,
}
