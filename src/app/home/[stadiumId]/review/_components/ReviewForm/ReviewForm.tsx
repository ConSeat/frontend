'use client';

import ConcertSelect from '../ConcertSelect/ConcertSelect';
import DistanceInfoSelect from '../DistanceInfoSelect/DistanceInfoSelect';
import FeaturesInfo from '../FeaturesInfo';
import ObstructionsInfo from '../ObstructionsInfo';
import ReviewContents from '../ReviewContents/ReviewContents';
import ReviewSection from '../ReviewSection/ReviewSection';
import SeatImage from '../SeatImage';
import SeatInfoSelect from '../SeatInfoSelect/SeatInfoSelect';
import styles from './ReviewForm.module.scss';
import { Dispatch, useRef } from 'react';
import Button from '@/components/Button/Button';
import SmallStageView from '@/components/SmallStageView';
import Spacing from '@/components/Spacing/Spacing';
import {
  REVIEW,
  SCREEN_DISTANCE_INFO,
  STAGE_DISTANCE_INFO,
  THRUST_STAGE_DISTANCE_INFO,
} from '@/constants/review';
import type { ReviewAction, ReviewData } from '@/types/review';

interface ReviewFormProps {
  reviewData: ReviewData;
  dispatch: Dispatch<ReviewAction>;
}

const reviewRuleText = `[후기 규정]
            
※ 고객님의 개인 정보는 익명으로 처리되며, 개인정보보법에 기반하여 보호됩니다.

※ 해당 후기는 업로드 이후에 수정/삭제가 불가합니다. 만약 직접 촬영한 사진이 아니라면, 관리자에 의해 업로드가 제한될 수 있습니다.`;

const ReviewForm = ({ reviewData, dispatch }: ReviewFormProps) => {
  const stepRef = useRef<number>(0);
  stepRef.current = Math.max(stepRef.current, reviewData.currentStep);

  const isRender = (step: number) => stepRef.current >= step;

  return (
    <form className={styles.reviewFormLayout}>
      {isRender(REVIEW.STEPS.CONCERT_SELECT) && (
        <ReviewSection>
          <ReviewSection.Title
            title={REVIEW.MESSAGE.CONCERT_SELECT.TITLE}
            subtitle={REVIEW.MESSAGE.CONCERT_SELECT.SUBTITLE}
          />
          <ConcertSelect data={reviewData.concertId} dispatch={dispatch} />
        </ReviewSection>
      )}

      {isRender(REVIEW.STEPS.SEAT_INFO_SELECT) && (
        <ReviewSection>
          <SmallStageView stadiumId={reviewData.stadiumId} />
          <ReviewSection.Title
            title={REVIEW.MESSAGE.SEAT_INFO_SELECT.TITLE}
            subtitle={REVIEW.MESSAGE.SEAT_INFO_SELECT.SUBTITLE}
          />
          <SeatInfoSelect data={reviewData.seatingId} dispatch={dispatch} />
        </ReviewSection>
      )}

      {isRender(REVIEW.STEPS.FEATURES_INFO_SELECT) && (
        <ReviewSection>
          <ReviewSection.Title
            title={REVIEW.MESSAGE.FEATURES_INFO_SELECT.TITLE}
            subtitle={REVIEW.MESSAGE.FEATURES_INFO_SELECT.SUBTITLE}
          />
          <FeaturesInfo data={reviewData.features} dispatch={dispatch} />
        </ReviewSection>
      )}

      {isRender(REVIEW.STEPS.IMAGE_UPLOAD) && (
        <ReviewSection>
          <ReviewSection.Title
            title={REVIEW.MESSAGE.IMAGE_UPLOAD.TITLE}
            subtitle={REVIEW.MESSAGE.IMAGE_UPLOAD.SUBTITLE}
          />
          <SeatImage data={reviewData.images} dispatch={dispatch} />
        </ReviewSection>
      )}

      {isRender(REVIEW.STEPS.DISTANCE_INFO_SELECT) && (
        <ReviewSection>
          <ReviewSection.Title title={REVIEW.MESSAGE.SCREEN_DISTANCE.TITLE} />
          <DistanceInfoSelect
            name="stageDistance"
            options={STAGE_DISTANCE_INFO}
            dispatch={dispatch}
          />
          <Spacing size={12} />
          <ReviewSection.Title title={REVIEW.MESSAGE.THRUST_STAGE_DISTANCE.TITLE} />
          <DistanceInfoSelect
            name="thrustStageDistance"
            options={THRUST_STAGE_DISTANCE_INFO}
            dispatch={dispatch}
          />
          <Spacing size={12} />
          <ReviewSection.Title title={REVIEW.MESSAGE.SCREEN_DISTANCE.TITLE} />
          <DistanceInfoSelect
            name="screenDistance"
            options={SCREEN_DISTANCE_INFO}
            dispatch={dispatch}
          />
        </ReviewSection>
      )}

      {isRender(REVIEW.STEPS.OBSTRUCTIONS_SELECT) && (
        <ReviewSection>
          <ReviewSection.Title
            title={REVIEW.MESSAGE.OBSTRUCTIONS_SELECT.TITLE}
            subtitle={REVIEW.MESSAGE.OBSTRUCTIONS_SELECT.SUBTITLE}
          />
          <ObstructionsInfo data={reviewData.obstructions} dispatch={dispatch} />
        </ReviewSection>
      )}

      {isRender(REVIEW.STEPS.REVIEW_INPUT) && (
        <ReviewSection>
          <ReviewSection.Title title={REVIEW.MESSAGE.REVIEW_INPUT.TITLE} />
          <ReviewContents data={reviewData.contents} dispatch={dispatch} />
        </ReviewSection>
      )}

      {isRender(REVIEW.STEPS.SUBMIT) && (
        <>
          <Button>
            <span className={styles.submitButtonText}>작성완료</span>
          </Button>
          <pre className={styles.reviewRule}>{reviewRuleText}</pre>
        </>
      )}
    </form>
  );
};

export default ReviewForm;
