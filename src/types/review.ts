import { Dispatch } from 'react';
import { REVIEW } from '@/constants/review';

export type Review = (typeof REVIEW.ACTIONS)[keyof typeof REVIEW.ACTIONS];

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
  features: number[];
  images: ImageData[];
  stageDistance: number;
  thrustStageDistance: number;
  screenDistance: number;
  obstructions: number[];
  contents: string;
  currentStep: Step;
}

interface ActionPayload {
  concertId?: number;
  seatingId?: number;
  feature?: number;
  image?: ImageData;
  removeImageIndex?: number;
  stageDistance?: number;
  thrustStageDistance?: number;
  screenDistance?: number;
  obstruction?: number;
  content?: string;
}

export interface ReviewAction {
  type: Review;
  payload: ActionPayload;
}

export type ReviewDispatch = Dispatch<ReviewAction>;
