'use client';

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

export default function PhotoModal({ stadiumId, seatingId, reviewId }: PhotoModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { closeModal } = useRouterModal({
    modalPath: `/home/${stadiumId}/single/${seatingId}/${reviewId}`,
    fallbackPath: `/home/${stadiumId}/single/${seatingId}`,
  });

  const rawPidx = searchParams.get('pidx');
  const initialIdx = rawPidx !== null ? parseInt(rawPidx, 10) : NaN;

  const { data: review, isLoading } = useFetchReviewImages(Number(reviewId));
  const total = review?.images.length ?? 0;
  const { imageIndex, handleClickNext, handleClickPrev } = useImageSlide({
    initialIdx: isNaN(initialIdx) ? 0 : initialIdx,
    totalImageNumber: total,
  });

  useEffect(() => {
    router.replace(`?pidx=${imageIndex}`, { scroll: false });
  }, [imageIndex]);

  if (rawPidx === null) return null;
  if (isLoading) return <LoadingSpinner />;
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
        <Modal.Header title={`${imageIndex + 1}/${total}`} onClose={closeModal} />
        <ImageSlide
          imageSrcArray={review.images}
          currentIndex={imageIndex}
          height={400}
          onNext={handleClickNext}
          onPrev={handleClickPrev}
        />
        <Spacing size={56} />
      </Modal.Content>
    </Modal>
  );
}
