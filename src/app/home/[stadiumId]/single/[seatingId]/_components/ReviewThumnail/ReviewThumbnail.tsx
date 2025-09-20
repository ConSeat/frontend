import styles from './ReviewThumbnail.module.scss';
import { useState } from 'react';
import useImageSlide from '@/hooks/common/useImageSlide';
import useStateModal from '@/hooks/common/useStateModal';
import ImageModal from '@/components/ImageModal';
import ImageSlide from '@/components/ImageSlide';
import { getDisplayIndex } from '@/utils/getDisplayIndex';

interface ReviewThumbnailProps {
  images: string[];
  disableModalView?: boolean;
}

const ReviewThumbnail = ({ images, disableModalView = true }: ReviewThumbnailProps) => {
  const { imageIndex, handleClickNext, handleClickPrev, isTransitioning, sliderRef } =
    useImageSlide({ totalImageNumber: images.length });
  const { isModalOpen, openModal, closeModal } = useStateModal();

  const displayIndex = getDisplayIndex(imageIndex, images.length);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const handleImageClick = () => {
    if (disableModalView) return;
    setModalIndex(displayIndex);
    openModal();
  };

  return (
    <>
      <div className={styles.thumbnailContainer}>
        <ImageSlide
          imageSrcArray={images}
          currentIndex={imageIndex}
          height={'240px'}
          onNext={handleClickNext}
          onPrev={handleClickPrev}
          isTransitioning={isTransitioning}
          slideRef={sliderRef}
          onImageClick={handleImageClick}
        />
        <div className={styles.imageNumber}>
          {displayIndex}/{images.length}
        </div>
      </div>

      {isModalOpen && modalIndex !== null && (
        <ImageModal
          images={images}
          startIndex={modalIndex}
          onClose={() => {
            setModalIndex(null);
            closeModal();
          }}
        />
      )}
    </>
  );
};

export default ReviewThumbnail;
