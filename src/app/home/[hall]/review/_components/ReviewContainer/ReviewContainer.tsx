'use client';

import ReviewForm from '../ReviewForm';
import { useReducer } from 'react';
import { NONE, REVIEW_ACTIONS, REVIEW_STEPS } from '@/constants/review';
import type {
  AdditionalInfo,
  ReviewAction,
  ReviewData,
  SeatInfo,
  Step,
  ViewBlockInfo,
} from '@/types/review';
import { toggleSetItem } from '@/utils/toggleSetItem';

const FLOOR = 'FLOOR';
const NONE_SELECT = 0;

const createInitReviewData = (hall: string): ReviewData => {
  const initData: ReviewData = {
    hall,
    concert: null,
    seatInfo: {
      floor: '',
      section: '',
      column: undefined,
    },
    additionalInfo: new Set(),
    images: [],
    reviewSummary: [0, 0, 0],
    viewBlockInfo: new Set(),
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
  return (
    (seatInfo.floor === FLOOR && seatInfo.section) ||
    (seatInfo.floor !== FLOOR && seatInfo.section && seatInfo.column)
  );
};

const reviewReducer = (state: ReviewData, action: ReviewAction) => {
  switch (action.type) {
    case REVIEW_ACTIONS.CONCERT_SELECT:
      return updateState(state, {
        concert: action.payload.concert,
        currentStep: REVIEW_STEPS.SEAT_INFO_SELECT,
      });

    case REVIEW_ACTIONS.SEAT_INFO_SELECT:
      const { seatInfo } = action.payload;
      if (seatInfo === undefined) return state;

      const step = isSeatInfoComplete(seatInfo)
        ? REVIEW_STEPS.SEAT_INFO_SELECT + 1
        : REVIEW_STEPS.SEAT_INFO_SELECT;

      return updateState(state, { seatInfo: action.payload.seatInfo, currentStep: step as Step });

    case REVIEW_ACTIONS.ADDITIONAL_INFO_SELECT: {
      const { additionalInfo } = action.payload;
      if (additionalInfo === undefined) return state;

      return updateState(state, {
        additionalInfo: toggleSetItem<AdditionalInfo>(state.additionalInfo, additionalInfo),
        currentStep: REVIEW_STEPS.IMAGE_UPLOAD,
      });
    }

    case REVIEW_ACTIONS.IMAGE_UPLOAD: {
      const { images } = action.payload;
      if (images === undefined) return state;

      return updateState(state, {
        images: [...state.images, images],
        currentStep: REVIEW_STEPS.SUMMARY_INFO_SELECT,
      });
    }

    case REVIEW_ACTIONS.SUMMARY_INFO_SELECT: {
      const { reviewSummary } = action.payload;
      if (reviewSummary === undefined) return state;

      const { index, value } = reviewSummary;

      const nextSummary = state.reviewSummary.slice();
      nextSummary[index] = value;

      const step = nextSummary.every((elem) => elem !== NONE_SELECT)
        ? REVIEW_STEPS.SUMMARY_INFO_SELECT + 1
        : REVIEW_STEPS.SUMMARY_INFO_SELECT;

      return updateState(state, {
        reviewSummary: nextSummary,
        currentStep: step as Step,
      });
    }

    case REVIEW_ACTIONS.VIEW_BLOCK_SELECT: {
      const { viewBlockInfo } = action.payload;
      if (viewBlockInfo === undefined) return state;

      let nextInfo = new Set<ViewBlockInfo | unknown>();

      if (viewBlockInfo === NONE) {
        nextInfo = new Set([NONE]);
      } else {
        state.viewBlockInfo.delete(NONE);
        nextInfo = toggleSetItem<ViewBlockInfo>(state.viewBlockInfo, viewBlockInfo);
      }

      return updateState(state, {
        viewBlockInfo: nextInfo,
        currentStep: REVIEW_STEPS.REVIEW_INPUT,
      });
    }

    case REVIEW_ACTIONS.REVIEW_INPUT:
      return updateState(state, {
        review: action.payload.review,
        currentStep: REVIEW_STEPS.SUBMIT,
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
