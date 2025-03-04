'use client';

import AdditionalSeatInfo from '../AdditionalSeatInfo';
import ViewBlockInfoBanner from '../ViewBlockInfo';
import styles from './ReviewForm.module.scss';
import { ActionDispatch, useRef } from 'react';
import { ReviewStep } from '@/constants/review';
import type { ReviewAction, ReviewData } from '@/types/review';

interface ReviewFormProps {
  reviewData: ReviewData;
  dispatch: ActionDispatch<[action: ReviewAction]>;
}

const ReviewForm = ({ reviewData, dispatch }: ReviewFormProps) => {
  const {
    concert,
    seatInfo,
    additionalInfo,
    images,
    reviewSummary,
    viewBlockInfo,
    review,
    currentStep,
  } = reviewData;

  const stepRef = useRef<number>(0);
  stepRef.current = stepRef.current < currentStep ? currentStep : stepRef.current;

  const isRender = (step: number) => stepRef.current >= step;

  return (
    <form className={styles.reviewFormLayout}>
      {isRender(ReviewStep.ConcertSelect) && (
        <div className={styles.reviewBanner}>
          <h1>콘서트 선택</h1>
        </div>
      )}
      {isRender(ReviewStep.SeatInfoSelect) && (
        <div className={styles.reviewBanner}>
          <h1>좌석 선택</h1>
        </div>
      )}
      {isRender(ReviewStep.AdditionalInfoSelect) && (
        <div className={styles.reviewBanner}>
          <AdditionalSeatInfo additionalInfo={additionalInfo} dispatch={dispatch} />
        </div>
      )}
      {isRender(ReviewStep.ImageUpload) && (
        <div className={styles.reviewBanner}>
          <h1>시야 사진 등록</h1>
        </div>
      )}
      {isRender(ReviewStep.SummaryInfoSelect) && (
        <div className={styles.reviewBanner}>
          <h1>시야 요약 정보</h1>
        </div>
      )}
      {isRender(ReviewStep.viewBlockSelect) && (
        <div className={styles.reviewBanner}>
          <ViewBlockInfoBanner viewBlockInfo={viewBlockInfo} dispatch={dispatch} />
        </div>
      )}
      {isRender(ReviewStep.reviewInput) && (
        <div className={styles.reviewBanner}>
          <h1>리뷰 작성</h1>
        </div>
      )}
      {isRender(ReviewStep.submit) && (
        <div className={styles.reviewBanner}>
          <h1>리뷰 제출</h1>
        </div>
      )}
    </form>
  );
};

export default ReviewForm;
