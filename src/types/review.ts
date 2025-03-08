import { Dispatch } from 'react';
import { ADDITIONAL_INFO, REVIEW, VIEW_BLOCK_INFO } from '@/constants/review';

export type Review = (typeof REVIEW.ACTIONS)[keyof typeof REVIEW.ACTIONS];
export type AdditionalInfo = (typeof ADDITIONAL_INFO)[number];
export type ViewBlockInfo = (typeof VIEW_BLOCK_INFO)[number];

export type Step = (typeof REVIEW.STEPS)[keyof typeof REVIEW.STEPS];

export interface ImageData {
  file: File;
  previewUrl: string;
}

export type DistanceInfoKey = 'stageDistance' | 'thrustStageDistance' | 'screenDistance';

export interface ReviewData {
  stadiumId: number;
  concertId: number;
  seatingId: number;
  additionalInfo: Set<AdditionalInfo>;
  images: ImageData[];
  stageDistance: number;
  thrustStageDistance: number;
  screenDistance: number;
  viewBlockInfo: Set<ViewBlockInfo>;
  review: string;
  currentStep: Step;
}

interface ActionPayload {
  concertId?: number;
  seatingId?: number;
  additionalInfo?: AdditionalInfo;
  image?: ImageData;
  removeImageIndex?: number;
  distanceInfo?: {
    key: DistanceInfoKey;
    value: number;
  };
  thrustStageDistance?: number;
  screenDistance?: number;
  viewBlockInfo?: ViewBlockInfo;
  review?: string;
}

export interface ReviewAction {
  type: Review;
  payload: ActionPayload;
}

export type ReviewDispatch = Dispatch<ReviewAction>;
