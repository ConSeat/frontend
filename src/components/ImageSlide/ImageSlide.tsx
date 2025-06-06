'use client';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './ImageSlide.module.scss';
import Image from 'next/image';
import { RefObject } from 'react';
import useSwipe from '@/hooks/common/useSwipe';

interface NavigationButtonsProps {
  onNext: () => void;
  onPrev: () => void;
}

const NavigationButtons = ({ onPrev, onNext }: NavigationButtonsProps) => (
  <>
    <Button className={styles.prev} onClick={onPrev} aria-label="이전 슬라이드">
      <Icon icon="PrevArrow" />
    </Button>
    <Button className={styles.next} onClick={onNext} aria-label="다음 슬라이드">
      <Icon icon="NextArrow" />
    </Button>
  </>
);

interface ImageSlideProps {
  imageSrcArray: string[]; // [last, ...originals, first]
  currentIndex: number;
  height: number;
  onNext: () => void;
  onPrev: () => void;
  isTransitioning: boolean;
  onTransitionEnd?: () => void;
  slideRef: RefObject<HTMLDivElement | null>;
}

const ImageSlide = ({
  imageSrcArray,
  currentIndex,
  height,
  onPrev,
  onNext,
  isTransitioning,
  onTransitionEnd,
  slideRef,
}: ImageSlideProps) => {
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(onNext, onPrev);

  const total = imageSrcArray.length;
  const images = [imageSrcArray[total - 1], ...imageSrcArray, imageSrcArray[0]];

  return (
    <div
      className={styles.slideContainer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={slideRef}
        style={{
          display: 'flex',
          width: `${100 * total}%`,
          transform: `translateX(-${(100 / total) * currentIndex}%)`,
          transition: isTransitioning ? 'transform 0.5s ease' : 'none',
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className={styles.slideItem}
            style={{ flex: `0 0 ${100 / total}%`, height: `${height}px` }}
          >
            <Image
              src={src}
              alt={`slide-${idx}`}
              fill
              style={{ objectFit: 'cover' }}
              priority={idx === 1}
            />
          </div>
        ))}
      </div>
      <NavigationButtons onPrev={onPrev} onNext={onNext} />
    </div>
  );
};

export default ImageSlide;
