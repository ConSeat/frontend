'use client';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './ImageSlide.module.scss';
import useSwipe from '@/hooks/common/useSwipe';

interface NavigationButtonsProps {
  onNext: () => void;
  onPrev: () => void;
}

const NavigationButtons = ({ onPrev, onNext }: NavigationButtonsProps) => {
  return (
    <>
      <Button className={styles.prev} onClick={onPrev}>
        <Icon icon="PrevArrow" />
      </Button>

      <Button className={styles.next} onClick={onNext}>
        <Icon icon="NextArrow" />
      </Button>
    </>
  );
};

interface ImageSlideProps {
  imageSrcArray: string[];
  currentIndex: number;
  height: number;
  onNext: () => void;
  onPrev: () => void;
}

const ImageSlide = ({ currentIndex, imageSrcArray, height, onPrev, onNext }: ImageSlideProps) => {
  const { handleTouchEnd, handleTouchMove, handleTouchStart } = useSwipe(onNext, onPrev);
  const totalLength = imageSrcArray.length;

  return (
    <div
      className={styles.slideContainer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          width: `${100 * totalLength}%`,
          height: `${height}px`,
          transform: `translateX(-${(100 / totalLength) * (currentIndex - 1)}%)`,
          transition: `transform 0.5s`,
        }}
      >
        {imageSrcArray.map((src, index) => {
          return (
            <img
              key={index}
              src={src}
              width={`${100 / totalLength}%`}
              height={height}
              style={{ objectFit: 'contain' }}
            />
          );
        })}
      </div>
      <NavigationButtons onPrev={onPrev} onNext={onNext} />
    </div>
  );
};

export default ImageSlide;
