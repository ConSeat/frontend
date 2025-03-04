import { ActionDispatch } from 'react';
import { REVIEW, additionalInfoArray, viewBlockInfoArray } from '@/constants/review';

export type Review = (typeof REVIEW.ACTIONS)[keyof typeof REVIEW.ACTIONS];
export type AdditionalInfo = (typeof additionalInfoArray)[number];
export type ViewBlockInfo = (typeof viewBlockInfoArray)[number];

export type Step = (typeof REVIEW.STEP)[keyof typeof REVIEW.STEP];
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
  currentStep: Step;
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
