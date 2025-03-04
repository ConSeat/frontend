import { ActionDispatch } from 'react';
import {
  ADDITIONAL_INFO_SELECT,
  CONCERT_SELECT,
  IMAGE_UP_LOAD,
  REVIEW_INPUT,
  ReviewStep,
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

export type AdditionalInfo = (typeof additionalInfoArray)[number];
export type ViewBlockInfo = (typeof viewBlockInfoArray)[number];

// type ImageFile = File & {
//   type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
// };

interface ImageData {
  // file: ImageFile;
  file: string;
  previewUrl: string;
}

export interface SeatInfo {
  floor: string;
  section: string;
  column?: string;
}

export interface ReviewData {
  hall: string;
  concert: string | null;
  seatInfo: SeatInfo;
  additionalInfo: Set<AdditionalInfo> | Set<unknown>;
  images: ImageData[];
  reviewSummary: number[];
  viewBlockInfo: Set<ViewBlockInfo> | Set<unknown>;
  review: string;
  currentStep: ReviewStep;
}

interface ActionPayload {
  concert?: string;
  seatInfo?: SeatInfo;
  additionalInfo?: AdditionalInfo;
  images?: ImageData;
  reviewSummary?: { index: number; value: number };
  viewBlockInfo?: ViewBlockInfo;
  review?: string;
}

export interface ReviewAction {
  type: Review;
  payload: ActionPayload;
}

export type ReviewDispatch = ActionDispatch<[action: ReviewAction]>;
