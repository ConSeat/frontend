import { Dispatch } from 'react';
import type { DISTANCE_VALUE } from '@/app/home/[stadiumId]/review/_constants/info';
import { REVIEW } from '@/app/home/[stadiumId]/review/_constants/review';

export type Review = (typeof REVIEW.ACTIONS)[keyof typeof REVIEW.ACTIONS];

export type Step = (typeof REVIEW.STEPS)[keyof typeof REVIEW.STEPS];

export interface ImageData {
  file: File;
  previewUrl: string;
}

export type DistanceInfoKey = 'stageDistance' | 'thrustStageDistance' | 'screenDistance';

export type DistanceValue = (typeof DISTANCE_VALUE)[keyof typeof DISTANCE_VALUE];

export interface ReviewData {
  stadiumId: number;
  concertId: number;
  seatingId: number;
  features: number[];
  images: ImageData[];
  stageDistance: DistanceValue;
  thrustStageDistance: DistanceValue;
  screenDistance: DistanceValue;
  obstructions: number[];
  contents: string;
  currentStep: Step;
}

export interface ReviewSubmitRequestBody {
  features: number[];
  images: string[];
  stageDistance: string;
  thrustStageDistance: string;
  screenDistance: string;
  obstructions: number[];
  contents: string;
}

interface ActionPayload {
  concertId?: number;
  seatingId?: number;
  feature?: number;
  image?: ImageData;
  removeImageIndex?: number;
  stageDistance?: DistanceValue;
  thrustStageDistance?: DistanceValue;
  screenDistance?: DistanceValue;
  obstruction?: number;
  content?: string;
}

export interface ReviewAction {
  type: Review;
  payload: ActionPayload;
}

export type ReviewDispatch = Dispatch<ReviewAction>;

export interface SeatingReview {
  reviewId: number;
  images: string[];
  features: string[];
  obstructions: string[];
  concertName: string;
  contents: string;
  writerSrc: string;
  createdAt: string;
  writerNickname: string;
  likesCount: number;
  isBookmarked: boolean;
  isLiked: boolean;
}

export type ListSort = '' | 'modifiedAt';

export type ReviewListQueryParams = {
  features?: number[];
  obstructions?: number[];
  lastReviewId?: number;
  sort?: ListSort;
};
