'use client';

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
    <div className={styles.reviewFormLayout}>
      <form>
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
            <h1>추가 좌석 정보 선택</h1>
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
            <h1>시야 방해 요소</h1>
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
    </div>
  );
};

export default ReviewForm;
