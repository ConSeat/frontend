'use client';

import styles from './PhotoModal.module.scss';
import { notFound } from 'next/navigation';
import useImageSlide from '@/hooks/common/useImageSlide';
import { useFetchReviewImages } from '@/hooks/queries/useFetchSeatingReview';
import ImageSlide from '@/components/ImageSlide';
import Modal from '@/components/Modal';
import Spacing from '@/components/Spacing/Spacing';
import LoadingSpinner from '@/app/mypage/_components/LoadingSpinner';
import { getDisplayIndex } from '@/utils/getDisplayIndex';

interface PhotoModalProps {
  reviewId: number;
  initialIdx: number;
  closeModal: () => void;
}

const PhotoModal = ({ reviewId, initialIdx, closeModal }: PhotoModalProps) => {
  const { data: review, isLoading } = useFetchReviewImages(Number(reviewId));
  const total = review?.images.length ?? 0;
  const { imageIndex, handleClickNext, handleClickPrev, isTransitioning, sliderRef } =
    useImageSlide({
      initialIdx: isNaN(initialIdx) ? 0 : initialIdx + 1,
      totalImageNumber: total,
    });

  const displayIndex = getDisplayIndex(imageIndex, total);

  if (isLoading) {
    return <LoadingSpinner />;
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
