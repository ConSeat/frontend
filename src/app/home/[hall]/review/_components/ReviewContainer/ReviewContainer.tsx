'use client';

import ReviewForm from '../ReviewForm';
import { useReducer } from 'react';
import { NONE, ReviewStep } from '@/constants/review';
import type {
  AddtionalInfo,
  ReviewAction,
  ReviewData,
  SeatInfo,
  ViewBlockInfo,
} from '@/types/review';

const FLOOR = 'FLOOR';
const NONE_SELECT = 0;

const createInitReviewData = (hall: string): ReviewData => {
  const initData: ReviewData = {
    hall,
    concert: null,
    seatInfo: {
      floor: '',
      section: '',
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

const toggleSetItem = <T extends string>(set: Set<T | unknown>, item: T): Set<T | unknown> => {
  const newSet = new Set<T | unknown>(set);

  if (newSet.has(item)) {
    newSet.delete(item);
  } else {
    newSet.add(item);
  }

  return newSet;
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
    case 'CONCERT_SELECT':
      return updateState(state, {
        concert: action.payload.concert,
        currentStep: ReviewStep.SeatInfoSelect,
      });

    case 'SEAT_INFO_SELECT':
      const { seatInfo } = action.payload;
      if (seatInfo === undefined) return state;

      const step = isSeatInfoComplete(seatInfo)
        ? ReviewStep.SeatInfoSelect + 1
        : ReviewStep.SeatInfoSelect;

      return updateState(state, { seatInfo: action.payload.seatInfo, currentStep: step });

    case 'ADDITIONAL_INFO_SELECT': {
      const { additionalInfo } = action.payload;
      if (additionalInfo === undefined) return state;

      return updateState(state, {
        additionalInfo: toggleSetItem<AddtionalInfo>(state.additionalInfo, additionalInfo),
        currentStep: ReviewStep.ImageUpload,
      });
    }

    case 'IMAGE_UP_LOAD': {
      const { images } = action.payload;
      if (images === undefined) return state;

      return updateState(state, {
        images: [...state.images, images],
        currentStep: ReviewStep.SummaryInfoSelect,
      });
    }

    case 'SUMMARY_INFO_SELECT': {
      const { reviewSummary } = action.payload;
      if (reviewSummary === undefined) return state;

      const { index, value } = reviewSummary;

      const nextSummary = state.reviewSummary.slice();
      nextSummary[index] = value;

      const step = nextSummary.every((elem) => elem !== NONE_SELECT)
        ? ReviewStep.SummaryInfoSelect + 1
        : ReviewStep.SummaryInfoSelect;

      return updateState(state, {
        reviewSummary: nextSummary,
        currentStep: step,
      });
    }

    case 'VIEW_BLOCK_SELECT': {
      const { viewBlockInfo } = action.payload;
      if (viewBlockInfo === undefined) return state;

      let nextInfo = new Set<ViewBlockInfo | unknown>();

      if (viewBlockInfo === NONE) {
        nextInfo = new Set(NONE);
      } else {
        nextInfo = toggleSetItem<ViewBlockInfo>(state.viewBlockInfo, viewBlockInfo);
      }

      return updateState(state, {
        viewBlockInfo: nextInfo,
        currentStep: ReviewStep.reviewInput,
      });
    }

    case 'REVIEW_INPUT':
      return updateState(state, { review: action.payload.review, currentStep: ReviewStep.submit });

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
