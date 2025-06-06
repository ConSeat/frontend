'use client';

import DelayLoading from '../DelayLoading/DelayLoading';
import Spacing from '../Spacing/Spacing';
import styles from './PhotoModal.module.scss';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import useImageSlide from '@/hooks/common/useImageSlide';
import useRouterModal from '@/hooks/common/useRouterModal';
import { useFetchReviewImages } from '@/hooks/queries/useFetchSeatingReview';
import ImageSlide from '@/components/ImageSlide';
import Modal from '@/components/Modal';
import LoadingSpinner from '@/app/mypage/_components/LoadingSpinner';

interface PhotoModalProps {
  stadiumId: string;
  seatingId: string;
  reviewId: string;
}

const PhotoModal = ({ reviewId }: PhotoModalProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const modalPath =
    typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/home';
  const fallbackPath =
    typeof window !== 'undefined'
      ? window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))
      : '/home';

  const { closeModal } = useRouterModal({
    modalPath: modalPath,
    fallbackPath: fallbackPath,
  });

  const rawPidx = searchParams.get('pidx');
  const initialIdx = rawPidx !== null ? parseInt(rawPidx, 10) : NaN;

  const { data: review, isLoading } = useFetchReviewImages(Number(reviewId));
  const total = review?.images.length ?? 0;
  const { imageIndex, handleClickNext, handleClickPrev, isTransitioning, sliderRef } =
    useImageSlide({
      initialIdx: isNaN(initialIdx) ? 0 : initialIdx + 1,
      totalImageNumber: total,
    });

  const originalsLength = total;

  const getDisplayIndex = (currentIndex: number, originalsLength: number) => {
    if (currentIndex === 0) return originalsLength;
    if (currentIndex === originalsLength + 1) return 1;

    return currentIndex;
  };

  const displayIndex = getDisplayIndex(imageIndex, originalsLength);

  useEffect(() => {
    router.replace(`?pidx=${displayIndex - 1}`, { scroll: false });
  }, [displayIndex]);

  if (rawPidx === null) return null;

  if (isLoading) {
    return (
      <DelayLoading>
        <LoadingSpinner />
      </DelayLoading>
    );
  }

  if (!review) {
    notFound();
  }

  if (isNaN(initialIdx) || initialIdx < 0 || initialIdx >= total) {
    return null;
  }

  return (
    <Modal>
      <Modal.Overlay onClick={closeModal} className={styles.overlay} />
      <Modal.Content className={styles.content}>
        <Modal.Header title={`${displayIndex}/${total}`} onClose={closeModal} />
        <ImageSlide
          imageSrcArray={review.images}
          currentIndex={imageIndex}
          height={400}
          onNext={handleClickNext}
          onPrev={handleClickPrev}
          isTransitioning={isTransitioning}
          slideRef={sliderRef}
        />
        <Spacing size={56} />
      </Modal.Content>
    </Modal>
  );
};

export default PhotoModal;
