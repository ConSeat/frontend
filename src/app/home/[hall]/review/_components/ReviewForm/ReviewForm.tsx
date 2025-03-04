'use client';

import AdditionalSeatInfo from '../AdditionalSeatInfo';
import ConcertSelectContent from '../ConcertSelectContent/ConcertSelectContent';
import SelectionBox from '../ReviewSection/ReviewSection';
import ReviewSection from '../ReviewSection/ReviewSection';
import ViewBlockInfoBanner from '../ViewBlockInfo';
import styles from './ReviewForm.module.scss';
import { ActionDispatch, useRef } from 'react';
import { REVIEW } from '@/constants/review';
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
      {isRender(REVIEW.STEPS.CONCERT_SELECT) && (
        <ReviewSection>
          <SelectionBox.Title
            title={REVIEW.MESSAGE.CONCERT_SELECT.TITLE}
            subtitle={REVIEW.MESSAGE.CONCERT_SELECT.SUBTITLE}
          />
          <ConcertSelectContent data={reviewData.concert} dispatch={dispatch} />
        </ReviewSection>
      )}
      {isRender(REVIEW.STEPS.SEAT_INFO_SELECT) && (
        <div className={styles.reviewBanner}>
          <h1>좌석 선택</h1>
        </div>
      )}
      {isRender(REVIEW.STEPS.ADDITIONAL_INFO_SELECT) && (
        <div className={styles.reviewBanner}>
          <AdditionalSeatInfo additionalInfo={reviewData.additionalInfo} dispatch={dispatch} />
        </div>
      )}
      {isRender(REVIEW.STEPS.IMAGE_UPLOAD) && (
        <div className={styles.reviewBanner}>
          <h1>시야 사진 등록</h1>
        </div>
      )}
      {isRender(REVIEW.STEPS.SUMMARY_INFO_SELECT) && (
        <div className={styles.reviewBanner}>
          <h1>시야 요약 정보</h1>
        </div>
      )}
      {isRender(REVIEW.STEPS.VIEW_BLOCK_SELECT) && (
        <div className={styles.reviewBanner}>
          <ViewBlockInfoBanner viewBlockInfo={reviewData.viewBlockInfo} dispatch={dispatch} />
        </div>
      )}
      {isRender(REVIEW.STEPS.REVIEW_INPUT) && (
        <div className={styles.reviewBanner}>
          <h1>리뷰 작성</h1>
        </div>
      )}
      {isRender(REVIEW.STEPS.SUBMIT) && (
        <div className={styles.reviewBanner}>
          <h1>리뷰 제출</h1>
        </div>
      )}
    </form>
  );
};

export default ReviewForm;
