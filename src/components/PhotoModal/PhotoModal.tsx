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
import { getDisplayIndex } from '@/utils/getDisplayIndex';

interface PhotoModalProps {
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

  const displayIndex = getDisplayIndex(imageIndex, total);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const current = searchParams.get('pidx');
    const next = String(displayIndex - 1);

    // 이미 있는 값이면 replace 하지 않음
    if (current !== next) {
      router.replace(`?pidx=${next}`, { scroll: false });
    }
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
