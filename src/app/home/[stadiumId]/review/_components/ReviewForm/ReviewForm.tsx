'use client';

import {
  SCREEN_DISTANCE_INFO,
  STAGE_DISTANCE_INFO,
  THRUST_STAGE_DISTANCE_INFO,
} from '../../_constants/info';
import { REVIEW } from '../../_constants/review';
import { useAutoScroll } from '../../_hooks/useAutoScroll';
import { getInvalidFields } from '../../_utils/getInvalidFields';
import ConcertSelect from '../ConcertSelect/ConcertSelect';
import DistanceInfoSelect from '../DistanceInfoSelect/DistanceInfoSelect';
import FeaturesInfo from '../FeaturesInfo';
import ObstructionsInfo from '../ObstructionsInfo';
import ReviewContents from '../ReviewContents/ReviewContents';
import ReviewSection from '../ReviewSection/ReviewSection';
import SeatImage from '../SeatImage';
import SeatInfoSelect from '../SeatInfoSelect/SeatInfoSelect';
import styles from './ReviewForm.module.scss';
import classNames from 'classnames';
import React, { Dispatch, useRef, useState } from 'react';
import Button from '@/components/Button/Button';
import SmallStageView from '@/components/SmallStageView';
import Spacing from '@/components/Spacing/Spacing';
import { usePopup } from '@/providers/PopupProvider';
import { useToast } from '@/providers/ToastProvider';
import type { ReviewAction, ReviewData } from '@/types/review';

interface ReviewFormProps {
  reviewData: ReviewData;
  dispatch: Dispatch<ReviewAction>;
  onSubmit: () => void;
}

const ReviewForm = ({ reviewData, dispatch, onSubmit }: ReviewFormProps) => {
  const [triedSubmit, setTriedSubmit] = useState(false);
  const { showPopup } = usePopup();
  const { activateToast } = useToast();

  const stepRef = useRef<number>(0);
  stepRef.current = Math.max(stepRef.current, reviewData.currentStep);

  const isRender = (step: number) => stepRef.current >= step;

  const sectionRefs = useRef({
    concertId: null,
    seatingId: null,
    features: null,
    images: null,
    stageDistance: null,
    thrustStageDistance: null,
    screenDistance: null,
    obstructions: null,
    contents: null,
    submit: null,
  } as Record<string, HTMLDivElement | null>);

  type SectionKeys = keyof typeof sectionRefs.current;

  const assignRef = (key: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[key] = el;
  };

  const invalidFields = getInvalidFields(reviewData) as SectionKeys[];

  const { scrollToInvalid } = useAutoScroll<SectionKeys>(stepRef.current, sectionRefs.current);

  const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTriedSubmit(true);

    // 유효하지 않은 경우: toast
    if (invalidFields.length > 0) {
      scrollToInvalid(invalidFields);
      activateToast('입력하지 않은 정보가 있어요!', 'Warning');
      return;
    }

    // 유효한 경우: popup
    showPopup({
      title: '후기를 등록하시겠습니까?',
      subtitle:
        '등록된 후기는 수정/삭제가 불가합니다. 민감한 정보가 들어간 후기는 관리자에 의해 삭제 처리될 수 있습니다.',
      onConfirm: onSubmit,
    });
  };

  return (
    <form className={styles.reviewFormLayout}>
      {/* 콘서트 선택 */}
      {isRender(REVIEW.STEPS.CONCERT_SELECT) && (
        <ReviewSection
          ref={assignRef('concertId')}
          isInvalid={triedSubmit && invalidFields.includes('concertId')}
        >
          <ReviewSection.Title
            title={REVIEW.MESSAGE.CONCERT_SELECT.TITLE}
            subtitle={REVIEW.MESSAGE.CONCERT_SELECT.SUBTITLE}
          />
          <ConcertSelect stadiumId={reviewData.stadiumId} dispatch={dispatch} />
        </ReviewSection>
      )}

      {/* 층, 구역, 열 선택 */}
      {isRender(REVIEW.STEPS.SEAT_INFO_SELECT) && (
        <ReviewSection
          ref={assignRef('seatingId')}
          isInvalid={triedSubmit && invalidFields.includes('seatingId')}
        >
          <SmallStageView stadiumId={reviewData.stadiumId} />
          <ReviewSection.Title
            title={REVIEW.MESSAGE.SEAT_INFO_SELECT.TITLE}
            subtitle={REVIEW.MESSAGE.SEAT_INFO_SELECT.SUBTITLE}
          />
          <SeatInfoSelect
            stadiumId={reviewData.stadiumId}
            data={reviewData.seatingId}
            dispatch={dispatch}
          />
        </ReviewSection>
      )}

      {/* 특이사항 선택 */}
      {isRender(REVIEW.STEPS.FEATURES_INFO_SELECT) && (
        <ReviewSection
          ref={assignRef('features')}
          isInvalid={triedSubmit && invalidFields.includes('features')}
        >
          <ReviewSection.Title
            title={REVIEW.MESSAGE.FEATURES_INFO_SELECT.TITLE}
            subtitle={REVIEW.MESSAGE.FEATURES_INFO_SELECT.SUBTITLE}
          />
          <FeaturesInfo data={reviewData.features} dispatch={dispatch} />
        </ReviewSection>
      )}

      {/* 시야 사진 업로드 */}
      {isRender(REVIEW.STEPS.IMAGE_UPLOAD) && (
        <ReviewSection
          ref={assignRef('images')}
          isInvalid={triedSubmit && invalidFields.includes('images')}
        >
          <ReviewSection.Title
            title={REVIEW.MESSAGE.IMAGE_UPLOAD.TITLE}
            subtitle={REVIEW.MESSAGE.IMAGE_UPLOAD.SUBTITLE}
          />
          <SeatImage data={reviewData.images} dispatch={dispatch} />
        </ReviewSection>
      )}

      {/* 무대, 돌출무대, 스크린 거리 선택 */}
      {isRender(REVIEW.STEPS.DISTANCE_INFO_SELECT) && (
        <ReviewSection
          ref={assignRef('stageDistance')}
          isInvalid={
            triedSubmit &&
            invalidFields.some((field) =>
              ['stageDistance', 'thrustStageDistance', 'screenDistance'].includes(field),
            )
          }
        >
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

      {/* 방해 요소 선택 */}
      {isRender(REVIEW.STEPS.OBSTRUCTIONS_SELECT) && (
        <ReviewSection
          ref={assignRef('obstructions')}
          isInvalid={triedSubmit && invalidFields.includes('obstructions')}
        >
          <ReviewSection.Title
            title={REVIEW.MESSAGE.OBSTRUCTIONS_SELECT.TITLE}
            subtitle={REVIEW.MESSAGE.OBSTRUCTIONS_SELECT.SUBTITLE}
          />
          <ObstructionsInfo data={reviewData.obstructions} dispatch={dispatch} />
        </ReviewSection>
      )}

      {/* 시야 후기 작성 */}
      {isRender(REVIEW.STEPS.REVIEW_INPUT) && (
        <ReviewSection
          ref={assignRef('contents')}
          isInvalid={triedSubmit && invalidFields.includes('contents')}
        >
          <ReviewSection.Title title={REVIEW.MESSAGE.REVIEW_INPUT.TITLE} />
          <ReviewContents data={reviewData.contents} dispatch={dispatch} />
        </ReviewSection>
      )}

      {/* 작성 완료 버튼 */}
      <div
        ref={assignRef('submit')}
        className={classNames(styles.submit, { [styles.visible]: isRender(REVIEW.STEPS.SUBMIT) })}
      >
        <Button
          variant={getInvalidFields(reviewData).length > 0 ? 'inactive' : 'primary'}
          onClick={handleSubmitButton}
        >
          <span className={styles.submitButtonText}>작성완료</span>
        </Button>
        <pre className={styles.reviewRule}>{REVIEW.MESSAGE.REVIEW_RULE.TEXT}</pre>
      </div>
    </form>
  );
};

export default ReviewForm;
