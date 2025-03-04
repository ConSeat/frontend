'use client';

import AdditionalSeatInfo from '../AdditionalSeatInfo';
import ViewBlockInfoBanner from '../ViewBlockInfo';
import styles from './ReviewForm.module.scss';
import { ActionDispatch, useRef } from 'react';
import { REVIEW_STEPS } from '@/constants/review';
import type { ReviewAction, ReviewData } from '@/types/review';

interface ReviewFormProps {
  reviewData: ReviewData;
  dispatch: ActionDispatch<[action: ReviewAction]>;
}

const ReviewForm = ({ reviewData, dispatch }: ReviewFormProps) => {
  const stepRef = useRef<number>(0);
  stepRef.current = Math.max(stepRef.current, reviewData.currentStep);

  const isRender = (step: number) => stepRef.current >= step;

  return (
    <form className={styles.reviewFormLayout}>
      {isRender(REVIEW_STEPS.CONCERT_SELECT) && (
        <div className={styles.reviewBanner}>
          <h1>콘서트 선택</h1>
        </div>
      )}
      {isRender(REVIEW_STEPS.SEAT_INFO_SELECT) && (
        <div className={styles.reviewBanner}>
          <h1>좌석 선택</h1>
        </div>
      )}
      {isRender(REVIEW_STEPS.ADDITIONAL_INFO_SELECT) && (
        <div className={styles.reviewBanner}>
          <AdditionalSeatInfo additionalInfo={reviewData.additionalInfo} dispatch={dispatch} />
        </div>
      )}
      {isRender(REVIEW_STEPS.IMAGE_UPLOAD) && (
        <div className={styles.reviewBanner}>
          <h1>시야 사진 등록</h1>
        </div>
      )}
      {isRender(REVIEW_STEPS.SUMMARY_INFO_SELECT) && (
        <div className={styles.reviewBanner}>
          <h1>시야 요약 정보</h1>
        </div>
      )}
      {isRender(REVIEW_STEPS.VIEW_BLOCK_SELECT) && (
        <div className={styles.reviewBanner}>
          <ViewBlockInfoBanner viewBlockInfo={reviewData.viewBlockInfo} dispatch={dispatch} />
        </div>
      )}
      {isRender(REVIEW_STEPS.REVIEW_INPUT) && (
        <div className={styles.reviewBanner}>
          <h1>리뷰 작성</h1>
        </div>
      )}
      {isRender(REVIEW_STEPS.SUBMIT) && (
        <div className={styles.reviewBanner}>
          <h1>리뷰 제출</h1>
        </div>
      )}
    </form>
  );
};

export default ReviewForm;
