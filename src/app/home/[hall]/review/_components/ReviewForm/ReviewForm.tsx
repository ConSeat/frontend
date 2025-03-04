'use client';

import AdditionalSeatInfo from '../AdditionalSeatInfo';
import ConcertSelectContent from '../ConcertSelectContent/ConcertSelectContent';
import SelectionBox from '../ReviewSection/ReviewSection';
import ReviewSection from '../ReviewSection/ReviewSection';
import SeatInfoSelectContent from '../SeatInfoSelectContent/SeatInfoSelectContent';
import ViewBlockInfoBanner from '../ViewBlockInfo';
import styles from './ReviewForm.module.scss';
import { Dispatch, useRef } from 'react';
import Button from '@/components/Button/Button';
import { REVIEW } from '@/constants/review';
import type { ReviewAction, ReviewData } from '@/types/review';

interface ReviewFormProps {
  reviewData: ReviewData;
  dispatch: Dispatch<ReviewAction>;
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
        <ReviewSection>
          <div>좌석 배치도</div>
          <SelectionBox.Title
            title={REVIEW.MESSAGE.SEAT_INFO_SELECT.TITLE}
            subtitle={REVIEW.MESSAGE.SEAT_INFO_SELECT.SUBTITLE}
          />
          <SeatInfoSelectContent data={reviewData.seatInfo} dispatch={dispatch} />
        </ReviewSection>
      )}
      {isRender(REVIEW.STEPS.ADDITIONAL_INFO_SELECT) && (
        <ReviewSection>
          <SelectionBox.Title
            title={REVIEW.MESSAGE.ADDITIONAL_INFO_SELECT.TITLE}
            subtitle={REVIEW.MESSAGE.ADDITIONAL_INFO_SELECT.SUBTITLE}
          />
          <AdditionalSeatInfo data={reviewData.additionalInfo} dispatch={dispatch} />
        </ReviewSection>
      )}
      {isRender(REVIEW.STEPS.IMAGE_UPLOAD) && (
        <ReviewSection>
          <SelectionBox.Title
            title={REVIEW.MESSAGE.IMAGE_UPLOAD.TITLE}
            subtitle={REVIEW.MESSAGE.IMAGE_UPLOAD.SUBTITLE}
          />
        </ReviewSection>
      )}
      {isRender(REVIEW.STEPS.SUMMARY_INFO_SELECT) && (
        <ReviewSection>
          <SelectionBox.Title title={REVIEW.MESSAGE.SUMMARY_INFO_SELECT.QUESTIONS[0]} />
          <SelectionBox.Title title={REVIEW.MESSAGE.SUMMARY_INFO_SELECT.QUESTIONS[1]} />
          <SelectionBox.Title title={REVIEW.MESSAGE.SUMMARY_INFO_SELECT.QUESTIONS[2]} />
        </ReviewSection>
      )}
      {isRender(REVIEW.STEPS.VIEW_BLOCK_SELECT) && (
        <ReviewSection>
          <SelectionBox.Title
            title={REVIEW.MESSAGE.VIEW_BLOCK_SELECT.TITLE}
            subtitle={REVIEW.MESSAGE.VIEW_BLOCK_SELECT.SUBTITLE}
          />
          <ViewBlockInfoBanner viewBlockInfo={reviewData.viewBlockInfo} dispatch={dispatch} />
        </ReviewSection>
      )}
      {isRender(REVIEW.STEPS.REVIEW_INPUT) && (
        <ReviewSection>
          <SelectionBox.Title title={REVIEW.MESSAGE.REVIEW_INPUT.TITLE} />
        </ReviewSection>
      )}
      {isRender(REVIEW.STEPS.SUBMIT) && <Button>작성완료</Button>}
    </form>
  );
};

export default ReviewForm;
