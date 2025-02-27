import {
  ADDITIONAL_INFO_SELECT,
  CONCERT_SELECT,
  IMAGE_UP_LOAD,
  REVIEW_INPUT,
  SEAT_INFO_SELECT,
  SUMMARY_INFO_SELECT,
  VIEW_BLOCK_SELECT,
  additionalInfoArray,
  viewBlockInfoArray,
} from '@/constants/review';

export type Review =
  | typeof CONCERT_SELECT
  | typeof SEAT_INFO_SELECT
  | typeof ADDITIONAL_INFO_SELECT
  | typeof IMAGE_UP_LOAD
  | typeof SUMMARY_INFO_SELECT
  | typeof VIEW_BLOCK_SELECT
  | typeof REVIEW_INPUT;

export type AddtionalInfo = (typeof additionalInfoArray)[number];
export type ViewBlockInfo = (typeof viewBlockInfoArray)[number];
