'use client';

import ReviewForm from '../ReviewForm';
import { useReducer } from 'react';
import { NONE, NONE_SELECT, REVIEW } from '@/constants/review';
import type { AdditionalInfo, ReviewAction, ReviewData, Step, ViewBlockInfo } from '@/types/review';
import { toggleSetItem } from '@/utils/toggleSetItem';

const createInitReviewData = (stadiumId: number): ReviewData => {
  const initData: ReviewData = {
    stadiumId,
    concertId: NONE_SELECT,
    seatingId: NONE_SELECT,
    additionalInfo: new Set<AdditionalInfo>(),
    images: [],
    stageDistance: NONE_SELECT,
    thrustStageDistance: NONE_SELECT,
    screenDistance: NONE_SELECT,
    viewBlockInfo: new Set<ViewBlockInfo>(),
    review: '',
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
        currentStep: (REVIEW.STEPS.REVIEW_INPUT + 1) as Step,
      });

    case REVIEW.ACTIONS.SEAT_INFO_SELECT:
      return updateState(state, {
        seatingId: action.payload.seatingId,
        currentStep: (REVIEW.STEPS.SEAT_INFO_SELECT + 1) as Step,
      });

    case REVIEW.ACTIONS.ADDITIONAL_INFO_SELECT: {
      const { additionalInfo } = action.payload;
      if (!additionalInfo) return state;

      return updateState(state, {
        additionalInfo: toggleSetItem<AdditionalInfo>(state.additionalInfo, additionalInfo),
        currentStep: (REVIEW.STEPS.ADDITIONAL_INFO_SELECT + 1) as Step,
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
      if (!action.payload.distanceInfo) return state;
      const { key, value } = action.payload.distanceInfo;

      const nextState = updateState(state, { [key]: value });

      const step = [
        nextState.stageDistance,
        nextState.thrustStageDistance,
        nextState.screenDistance,
      ].every((elem) => elem !== NONE_SELECT)
        ? REVIEW.STEPS.DISTANCE_INFO_SELECT + 1
        : REVIEW.STEPS.DISTANCE_INFO_SELECT;

      return updateState(nextState, { currentStep: step as Step });
    }

    case REVIEW.ACTIONS.VIEW_BLOCK_SELECT: {
      const { viewBlockInfo } = action.payload;
      if (!viewBlockInfo) return state;

      let nextInfo = new Set<ViewBlockInfo>();

      if (viewBlockInfo === NONE) {
        nextInfo = new Set([NONE]);
      } else {
        state.viewBlockInfo.delete(NONE);
        nextInfo = toggleSetItem<ViewBlockInfo>(state.viewBlockInfo, viewBlockInfo);
      }

      return updateState(state, {
        viewBlockInfo: nextInfo,
        currentStep: (REVIEW.STEPS.VIEW_BLOCK_SELECT + 1) as Step,
      });
    }

    case REVIEW.ACTIONS.REVIEW_INPUT:
      return updateState(state, {
        review: action.payload.review,
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
  console.log(state);

  return <ReviewForm reviewData={state} dispatch={dispatch} />;
};

export default ReviewContainer;
