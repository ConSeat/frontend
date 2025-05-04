import styles from './ReviewThumbnail.module.scss';
import useImageSlide from '@/hooks/common/useImageSlide';
import ImageSlide from '@/components/ImageSlide';

interface ReviewThumbnailProps {
  images: string[];
}

const ReviewThumbnail = ({ images }: ReviewThumbnailProps) => {
  const { imageIndex, handleClickNext, handleClickPrev } = useImageSlide({
    initialIdx: 0,
    totalImageNumber: images.length,
  });

  return (
    <div className={styles.thumbnailContainer}>
      <ImageSlide
        imageSrcArray={images}
        currentIndex={imageIndex}
        height={240}
        onNext={handleClickNext}
        onPrev={handleClickPrev}
      />
      <div className={styles.imageNumber}>
        {imageIndex + 1}/{images.length}
      </div>
    </div>
  );
};

export default ReviewThumbnail;
