'use client';

import ReviewForm from '../ReviewForm';
import { useReducer } from 'react';
import { FLOOR, NONE, NONE_SELECT, REVIEW } from '@/constants/review';
import type {
  AdditionalInfo,
  ReviewAction,
  ReviewData,
  SeatInfo,
  Step,
  ViewBlockInfo,
} from '@/types/review';
import { toggleSetItem } from '@/utils/toggleSetItem';

const createInitReviewData = (hall: string): ReviewData => {
  const initData: ReviewData = {
    hall,
    concert: '',
    seatInfo: {
      floor: '',
      section: '',
      column: '',
    },
    additionalInfo: new Set<AdditionalInfo>(),
    images: [],
    seatRating: [0, 0, 0],
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

const isSeatInfoComplete = (seatInfo: SeatInfo) => {
  return seatInfo.floor === FLOOR
    ? !!seatInfo.floor && !!seatInfo.section
    : !!seatInfo.floor && !!seatInfo.section && !!seatInfo.column;
};

const reviewReducer = (state: ReviewData, action: ReviewAction) => {
  switch (action.type) {
    case REVIEW.ACTIONS.CONCERT_SELECT:
      return updateState(state, {
        concert: action.payload.concert,
        currentStep: (REVIEW.STEPS.CONCERT_SELECT + 1) as Step,
      });

    case REVIEW.ACTIONS.SEAT_INFO_SELECT:
      const { seatInfo } = action.payload;
      if (!seatInfo) return state;

      const step = isSeatInfoComplete(seatInfo)
        ? REVIEW.STEPS.SEAT_INFO_SELECT + 1
        : REVIEW.STEPS.SEAT_INFO_SELECT;

      return updateState(state, { seatInfo, currentStep: step as Step });

    case REVIEW.ACTIONS.ADDITIONAL_INFO_SELECT: {
      const { additionalInfo } = action.payload;
      if (!additionalInfo) return state;

      return updateState(state, {
        additionalInfo: toggleSetItem<AdditionalInfo>(state.additionalInfo, additionalInfo),
        currentStep: (REVIEW.STEPS.ADDITIONAL_INFO_SELECT + 1) as Step,
      });
    }

    case REVIEW.ACTIONS.IMAGE_UPLOAD: {
      const { images } = action.payload;
      if (!images) return state;

      return updateState(state, {
        images: [...state.images, images],
        currentStep: REVIEW.STEPS.IMAGE_UPLOAD as Step,
      });
    }

    case REVIEW.ACTIONS.RATING_INFO_SELECT: {
      const { seatRating } = action.payload;
      if (seatRating === undefined) return state;

      const { index, value } = seatRating;

      const nextRating = state.seatRating.slice();
      nextRating[index] = value;

      const step = nextRating.every((elem) => elem !== NONE_SELECT)
        ? REVIEW.STEPS.RATING_INFO_SELECT + 1
        : REVIEW.STEPS.RATING_INFO_SELECT;

      return updateState(state, {
        seatRating: nextRating,
        currentStep: step as Step,
      });
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
  hall: string;
}

const ReviewContainer = ({ hall }: ReviewContainerProps) => {
  const [state, dispatch] = useReducer(reviewReducer, createInitReviewData(hall));

  return <ReviewForm reviewData={state} dispatch={dispatch} />;
};

export default ReviewContainer;
