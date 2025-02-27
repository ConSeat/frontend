'use client';

import { useReducer } from 'react';
import { NONE, ReviewStep } from '@/constants/review';
import type { AddtionalInfo, Review, ViewBlockInfo } from '@/types/review';

const FLOOR = 'FLOOR';
const NONE_SELECT = 0;

// type ImageFile = File & {
//   type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
// };

interface ImageData {
  // file: ImageFile;
  file: string;
  previewUrl: string;
}

interface SeatInfo {
  floor: string;
  section: string;
  column?: string;
}

interface ReviewData {
  hall: string;
  concert: string | null;
  seatInfo: SeatInfo;
  additionalInfo: Set<AddtionalInfo> | Set<unknown>;
  images: ImageData[];
  reviewSummary: [number, number, number];
  viewBlockInfo: Set<ViewBlockInfo> | Set<unknown>;
  review: string;
  currentStep: ReviewStep;
}

interface ActionPayload {
  concert?: string;
  seatInfo?: SeatInfo;
  additionalInfo?: AddtionalInfo;
  images?: ImageData;
  reviewSummary?: { index: number; value: number };
  viewBlockInfo?: ViewBlockInfo;
  review?: string;
}

interface ReviewAction {
  type: Review;
  payload: ActionPayload;
}

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

const isSelectAll = (seatInfo: SeatInfo) => {
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

      const step = isSelectAll(seatInfo)
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
      state.reviewSummary[index] = value;

      const nextSummary = state.reviewSummary;
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

      const nextInfo =
        viewBlockInfo === NONE
          ? new Set(NONE)
          : toggleSetItem<ViewBlockInfo>(state.viewBlockInfo, viewBlockInfo);

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

  const handleClick = () => {
    dispatch({
      type: 'CONCERT_SELECT',
      payload: {
        concert: '올림픽 체조 경기장',
      },
    });
  };

  const handleClick1 = () => {
    dispatch({
      type: 'SEAT_INFO_SELECT',
      payload: {
        seatInfo: {
          floor: FLOOR,
          section: '1구역',
        },
      },
    });
  };

  const handleClick2 = () => {
    dispatch({
      type: 'ADDITIONAL_INFO_SELECT',
      payload: {
        additionalInfo: '시제석',
      },
    });
  };

  const handleClick3 = () => {
    dispatch({
      type: 'IMAGE_UP_LOAD',
      payload: {
        images: {
          file: 'imageInfo',
          previewUrl: 'url',
        },
      },
    });
  };

  const handleClick4 = () => {
    dispatch({
      type: 'SUMMARY_INFO_SELECT',
      payload: {
        reviewSummary: {
          index: 0,
          value: 1,
        },
      },
    });
    dispatch({
      type: 'SUMMARY_INFO_SELECT',
      payload: {
        reviewSummary: {
          index: 1,
          value: 1,
        },
      },
    });
    dispatch({
      type: 'SUMMARY_INFO_SELECT',
      payload: {
        reviewSummary: {
          index: 2,
          value: 1,
        },
      },
    });
  };

  const handleClick5 = () => {
    dispatch({
      type: 'VIEW_BLOCK_SELECT',
      payload: {
        viewBlockInfo: '단차가 있어요',
      },
    });
  };

  const handleClick6 = () => {
    dispatch({
      type: 'REVIEW_INPUT',
      payload: {
        review: '내용',
      },
    });
  };

  return (
    <>
      <div onClick={handleClick}>콘서트 선택</div>
      {state.currentStep >= 1 && <div onClick={handleClick1}>좌석 선택</div>}
      {state.currentStep >= 2 && <div onClick={handleClick2}>추가 좌석 정보 선택</div>}
      {state.currentStep >= 3 && <div onClick={handleClick3}>시야 사진 등록</div>}
      {state.currentStep >= 4 && <div onClick={handleClick4}>후기 요약 선택</div>}
      {state.currentStep >= 5 && <div onClick={handleClick5}>시야 방해 요소 선택</div>}
      {state.currentStep >= 6 && <div onClick={handleClick6}>후기 작성</div>}
      {state.currentStep >= 7 && <div>제출 버튼</div>}
    </>
  );
};

export default ReviewContainer;
