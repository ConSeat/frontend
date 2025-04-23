'use client';

import { NONE_SELECT } from '../../_constants/info';
import { REVIEW } from '../../_constants/review';
import ReviewForm from '../ReviewForm';
import { useReducer } from 'react';
import type { ReviewAction, ReviewData, Step } from '@/types/review';
import { toggleItem } from '@/utils/toggleItem';

const createInitReviewData = (stadiumId: number): ReviewData => {
  const initData: ReviewData = {
    stadiumId,
    concertId: NONE_SELECT,
    seatingId: NONE_SELECT,
    features: [],
    images: [],
    stageDistance: '',
    thrustStageDistance: '',
    screenDistance: '',
    obstructions: [],
    contents: '',
    currentStep: 0,
  };

  return initData;
};

const updateState = (state: ReviewData, updates: Partial<ReviewData>) => ({
  ...state,
  ...updates,
});

const reviewReducer = (state: ReviewData, action: ReviewAction) => {
  switch (action.type) {
    case REVIEW.ACTIONS.CONCERT_SELECT:
      return updateState(state, {
        concertId: action.payload.concertId,
        currentStep: (REVIEW.STEPS.CONCERT_SELECT + 1) as Step,
      });

    case REVIEW.ACTIONS.SEAT_INFO_SELECT:
      return updateState(state, {
        seatingId: action.payload.seatingId,
        currentStep: (REVIEW.STEPS.SEAT_INFO_SELECT + 1) as Step,
      });

    case REVIEW.ACTIONS.FEATURES_INFO_SELECT: {
      const { feature } = action.payload;
      if (!feature) return state;

      let nextInfo: number[] = [];

      if (feature === NONE_SELECT) {
        nextInfo = state.features.includes(NONE_SELECT) ? [] : [NONE_SELECT];
      } else {
        nextInfo = state.features.filter((id) => id !== NONE_SELECT);
        nextInfo = toggleItem(nextInfo, feature);
      }

      return updateState(state, {
        features: nextInfo,
        currentStep: (REVIEW.STEPS.FEATURES_INFO_SELECT + 1) as Step,
      });
    }

    case REVIEW.ACTIONS.IMAGE_UPLOAD: {
      const { image } = action.payload;
      if (!image) return state;

      return updateState(state, {
        images: [...state.images, image],
        currentStep: (REVIEW.STEPS.IMAGE_UPLOAD + 1) as Step,
      });
    }

    case REVIEW.ACTIONS.IMAGE_REMOVE: {
      const { removeImageIndex } = action.payload;
      if (removeImageIndex === undefined) return state;

      return updateState(state, {
        images: state.images.filter((_, index) => removeImageIndex !== index),
        currentStep: REVIEW.STEPS.IMAGE_UPLOAD,
      });
    }

    case REVIEW.ACTIONS.DISTANCE_INFO_SELECT: {
      const { stageDistance, thrustStageDistance, screenDistance } = action.payload;
      const nextState = updateState(state, {
        ...(stageDistance !== undefined && { stageDistance }),
        ...(thrustStageDistance !== undefined && { thrustStageDistance }),
        ...(screenDistance !== undefined && { screenDistance }),
      });

      const step = [
        nextState.stageDistance,
        nextState.thrustStageDistance,
        nextState.screenDistance,
      ].every((value) => value !== '')
        ? REVIEW.STEPS.DISTANCE_INFO_SELECT + 1
        : REVIEW.STEPS.DISTANCE_INFO_SELECT;

      return updateState(nextState, { currentStep: step as Step });
    }

    case REVIEW.ACTIONS.OBSTRUCTIONS_SELECT: {
      const { obstruction } = action.payload;
      if (!obstruction) return state;

      let nextInfo: number[] = [];

      if (obstruction === NONE_SELECT) {
        nextInfo = state.obstructions.includes(NONE_SELECT) ? [] : [NONE_SELECT];
      } else {
        nextInfo = state.obstructions.filter((id) => id !== NONE_SELECT);
        nextInfo = toggleItem(nextInfo, obstruction);
      }
      return updateState(state, {
        obstructions: nextInfo,
        currentStep: (REVIEW.STEPS.OBSTRUCTIONS_SELECT + 1) as Step,
      });
    }

    case REVIEW.ACTIONS.REVIEW_INPUT:
      return updateState(state, {
        contents: action.payload.content,
        currentStep: (REVIEW.STEPS.REVIEW_INPUT + 1) as Step,
      });

    default:
      return state;
  }
};

interface ReviewContainerProps {
  stadiumId: number;
}

const ReviewContainer = ({ stadiumId }: ReviewContainerProps) => {
  const [state, dispatch] = useReducer(reviewReducer, createInitReviewData(stadiumId));

  return <ReviewForm reviewData={state} dispatch={dispatch} />;
};

export default ReviewContainer;
