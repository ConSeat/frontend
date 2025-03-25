'use client';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './ImageSlide.module.scss';

interface ImageSlideProps {
  imageSrcArray: string[];
  currentIndex: number;
  height: number;
  onNext: () => void;
  onPrev: () => void;
}

const ImageSlide = ({ currentIndex, imageSrcArray, height, onPrev, onNext }: ImageSlideProps) => {
  const totalLength = imageSrcArray.length;

  return (
    <div className={styles.slideContainer}>
      <div
        style={{
          width: `${100 * totalLength}%`,
          height: `${height}px`,
          transform: `translateX(-${(100 / totalLength) * (currentIndex - 1)}%)`,
        }}
      >
        {imageSrcArray.map((src, index) => {
          return (
            <img
              key={index}
              src={src}
              width={`${100 / totalLength}%`}
              height={height}
              style={{ objectFit: 'cover' }}
            />
          );
        })}
      </div>
      <div className={styles.imageNav}>
        <Button className={styles.navButton} onClick={onPrev}>
          <Icon icon="PrevArrow" />
        </Button>
        <Button className={styles.navButton} onClick={onNext}>
          <Icon icon="NextArrow" />
        </Button>
      </div>
    </div>
  );
};

export default ImageSlide;
