import styles from './ReviewThumbnail.module.scss';
import useImageSlide from '@/hooks/common/useImageSlide';
import ImageSlide from '@/components/ImageSlide';

interface ReviewThumbnailProps {
  images: string[];
}

const ReviewThumbnail = ({ images }: ReviewThumbnailProps) => {
  const { imageIndex, handleClickNext, handleClickPrev, isTransitioning, sliderRef } =
    useImageSlide({
      totalImageNumber: images.length,
    });

  const originalsLength = images.length;

  const getDisplayIndex = (currentIndex: number, originalsLength: number) => {
    if (currentIndex === 0) return originalsLength;
    if (currentIndex === originalsLength + 1) return 1;

    return currentIndex;
  };

  const displayIndex = getDisplayIndex(imageIndex, originalsLength);

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
