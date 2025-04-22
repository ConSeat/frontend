'use client';

import {
  SCREEN_DISTANCE_INFO,
  STAGE_DISTANCE_INFO,
  THRUST_STAGE_DISTANCE_INFO,
} from '../../_constants/info';
import { REVIEW } from '../../_constants/review';
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
import { useRouter } from 'next/navigation';
import { Dispatch, useRef } from 'react';
import useMutateReview from '@/hooks/mutations/useMutateReview';
import Button from '@/components/Button/Button';
import SmallStageView from '@/components/SmallStageView';
import Spacing from '@/components/Spacing/Spacing';
import { usePopup } from '@/providers/PopupProvider';
import type { ReviewAction, ReviewData } from '@/types/review';

interface ReviewFormProps {
  reviewData: ReviewData;
  dispatch: Dispatch<ReviewAction>;
}

const ReviewForm = ({ reviewData, dispatch }: ReviewFormProps) => {
  const { postReviewMutation, postReviewImagesMutation } = useMutateReview();
  const { showPopup } = usePopup();
  const router = useRouter();

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
  } as Record<string, HTMLDivElement | null>);

  const assignRef = (key: string) => (el: HTMLDivElement | null) => {
    sectionRefs.current[key] = el;
  };

  const handleSubmitReview = async () => {
    const { data: uploadImage } = await postReviewImagesMutation.mutateAsync(reviewData.images);
    const uploadImageUrls = uploadImage.originalImage;

    const sanitize = (arr: number[]) => (arr.includes(-1) ? [] : arr);

    const body = {
      features: sanitize(reviewData.features),
      images: uploadImageUrls,
      stageDistance: reviewData.stageDistance,
      thrustStageDistance: reviewData.thrustStageDistance,
      screenDistance: reviewData.screenDistance,
      obstructions: sanitize(reviewData.obstructions),
      contents: reviewData.contents,
    };

    postReviewMutation.mutate(
      {
        concertId: reviewData.concertId,
        seatingId: reviewData.seatingId,
        body,
      },
      {
        onSuccess: () => router.push(`/home/${reviewData.stadiumId}/review/complete`),
      },
    );
  };

  const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const invalidFields = getInvalidFields(reviewData);

    const distanceGroup = ['stageDistance', 'thrustStageDistance', 'screenDistance'];

    const isDistanceInvalid = distanceGroup.some((field) =>
      invalidFields.includes(field as keyof ReviewData),
    );

    if (isDistanceInvalid) {
      sectionRefs.current.stageDistance?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      return;
    }

    if (invalidFields.length > 0) {
      const firstInvalid = invalidFields[0];
      const target = sectionRefs.current[firstInvalid];

      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    // 유효한 경우 팝업 띄우기
    showPopup({
      title: '후기를 등록하시겠습니까?',
      subtitle:
        '등록된 후기는 수정/삭제가 불가합니다. 민감한 정보가 들어간 후기는 관리자에 의해 삭제 처리될 수 있습니다.',
      onConfirm: handleSubmitReview,
    });
  };

  return (
    <form className={styles.reviewFormLayout}>
      {isRender(REVIEW.STEPS.CONCERT_SELECT) && (
        <ReviewSection ref={assignRef('concertId')}>
          <ReviewSection.Title
            title={REVIEW.MESSAGE.CONCERT_SELECT.TITLE}
            subtitle={REVIEW.MESSAGE.CONCERT_SELECT.SUBTITLE}
          />
          <ConcertSelect stadiumId={reviewData.stadiumId} dispatch={dispatch} />
        </ReviewSection>
      )}

      {isRender(REVIEW.STEPS.SEAT_INFO_SELECT) && (
        <ReviewSection ref={assignRef('seatingId')}>
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

      {isRender(REVIEW.STEPS.FEATURES_INFO_SELECT) && (
        <ReviewSection ref={assignRef('features')}>
          <ReviewSection.Title
            title={REVIEW.MESSAGE.FEATURES_INFO_SELECT.TITLE}
            subtitle={REVIEW.MESSAGE.FEATURES_INFO_SELECT.SUBTITLE}
          />
          <FeaturesInfo data={reviewData.features} dispatch={dispatch} />
        </ReviewSection>
      )}

      {isRender(REVIEW.STEPS.IMAGE_UPLOAD) && (
        <ReviewSection ref={assignRef('images')}>
          <ReviewSection.Title
            title={REVIEW.MESSAGE.IMAGE_UPLOAD.TITLE}
            subtitle={REVIEW.MESSAGE.IMAGE_UPLOAD.SUBTITLE}
          />
          <SeatImage data={reviewData.images} dispatch={dispatch} />
        </ReviewSection>
      )}

      {isRender(REVIEW.STEPS.DISTANCE_INFO_SELECT) && (
        <ReviewSection ref={assignRef('stageDistance')}>
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
        <ReviewSection ref={assignRef('obstructions')}>
          <ReviewSection.Title
            title={REVIEW.MESSAGE.OBSTRUCTIONS_SELECT.TITLE}
            subtitle={REVIEW.MESSAGE.OBSTRUCTIONS_SELECT.SUBTITLE}
          />
          <ObstructionsInfo data={reviewData.obstructions} dispatch={dispatch} />
        </ReviewSection>
      )}

      {isRender(REVIEW.STEPS.REVIEW_INPUT) && (
        <ReviewSection ref={assignRef('contents')}>
          <ReviewSection.Title title={REVIEW.MESSAGE.REVIEW_INPUT.TITLE} />
          <ReviewContents data={reviewData.contents} dispatch={dispatch} />
        </ReviewSection>
      )}

      {isRender(REVIEW.STEPS.SUBMIT) && (
        <>
          <Button
            variant={getInvalidFields(reviewData).length > 0 ? 'inactive' : 'primary'}
            onClick={handleSubmitButton}
          >
            <span className={styles.submitButtonText}>작성완료</span>
          </Button>
          <pre className={styles.reviewRule}>{REVIEW.MESSAGE.REVIEW_RULE.TEXT}</pre>
        </>
      )}
    </form>
  );
};

export default ReviewForm;
