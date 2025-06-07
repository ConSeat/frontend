import styles from './ReviewThumbnail.module.scss';
import useImageSlide from '@/hooks/common/useImageSlide';
import ImageSlide from '@/components/ImageSlide';
import { getDisplayIndex } from '@/utils/getDisplayIndex';

interface ReviewThumbnailProps {
  images: string[];
}

const ReviewThumbnail = ({ images }: ReviewThumbnailProps) => {
  const { imageIndex, handleClickNext, handleClickPrev, isTransitioning, sliderRef } =
    useImageSlide({
      totalImageNumber: images.length,
    });

  const displayIndex = getDisplayIndex(imageIndex, images.length);

  return (
    <div className={styles.thumbnailContainer}>
      <ImageSlide
        imageSrcArray={images}
        currentIndex={imageIndex}
        height={240}
        onNext={handleClickNext}
        onPrev={handleClickPrev}
        isTransitioning={isTransitioning}
        slideRef={sliderRef}
      />
      <div className={styles.imageNumber}>
        {displayIndex}/{images.length}
      </div>
    </div>
  );
};

export default ReviewThumbnail;
