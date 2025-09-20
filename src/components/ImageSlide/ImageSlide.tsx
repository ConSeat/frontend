'use client';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './ImageSlide.module.scss';
import { RefObject } from 'react';

// import useSwipe from '@/hooks/common/useSwipe';

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
  imageSrcArray: string[];
  currentIndex: number;
  height?: string;
  onNext: () => void;
  onPrev: () => void;
  isTransitioning: boolean;
  onTransitionEnd?: () => void;
  slideRef: RefObject<HTMLDivElement | null>;
  onImageClick?: (index: number) => void;
}

const ImageSlide = ({
  imageSrcArray,
  currentIndex,
  height = '100%',
  onPrev,
  onNext,
  isTransitioning,
  onTransitionEnd,
  slideRef,
  onImageClick,
}: ImageSlideProps) => {
  // TODO: 아이폰 스크롤 튕겨지는 이슈 때문에 잠시 주석처리 해둠
  // const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(onNext, onPrev);

  const total = imageSrcArray.length;
  const images = [imageSrcArray[total - 1], ...imageSrcArray, imageSrcArray[0]]; // [last, ...originals, first]

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // 스크롤 방지
  };

  return (
    <div
      className={styles.slideContainer}
      onTouchMove={handleTouchMove}
      // onTouchStart={handleTouchStart}
      // onTouchEnd={handleTouchEnd}
    >
      <div
        ref={slideRef}
        style={{
          display: 'flex',
          height,
          width: `${100 * total}%`,
          transform: `translateX(-${(100 / total) * currentIndex}%)`,
          transition: isTransitioning ? 'transform 0.5s ease' : 'none',
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {images.map((src, idx) => {
          const actualIndex = (idx + total - 1) % total;
          return (
            <div
              key={idx}
              className={styles.slideItem}
              style={{ flex: `0 0 ${100 / total}%` }}
              onClick={() => onImageClick?.(actualIndex)}
            >
              <img
                src={src}
                alt={`slide-${idx}`}
                style={{
                  width: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          );
        })}
      </div>
      {imageSrcArray.length > 1 && <NavigationButtons onPrev={onPrev} onNext={onNext} />}
    </div>
  );
};

export default ImageSlide;
