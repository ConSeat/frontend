import { Dispatch } from 'react';
import { ADDITIONAL_INFO, REVIEW, VIEW_BLOCK_INFO } from '@/constants/review';

export type Review = (typeof REVIEW.ACTIONS)[keyof typeof REVIEW.ACTIONS];
export type AdditionalInfo = (typeof ADDITIONAL_INFO)[number];
export type ViewBlockInfo = (typeof VIEW_BLOCK_INFO)[number];

export type Step = (typeof REVIEW.STEPS)[keyof typeof REVIEW.STEPS];
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
  concert: string;
  seatInfo: SeatInfo;
  additionalInfo: Set<AdditionalInfo>;
  images: ImageData[];
  seatRating: number[];
  viewBlockInfo: Set<ViewBlockInfo>;
  review: string;
  currentStep: Step;
}

interface ActionPayload {
  concert?: string;
  seatInfo?: SeatInfo;
  additionalInfo?: AdditionalInfo;
  images?: ImageData;
  seatRating?: { index: number; value: number };
  viewBlockInfo?: ViewBlockInfo;
  review?: string;
}

export interface ReviewAction {
  type: Review;
  payload: ActionPayload;
}

export type ReviewDispatch = Dispatch<ReviewAction>;
