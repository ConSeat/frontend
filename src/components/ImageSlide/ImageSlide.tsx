'use client';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './ImageSlide.module.scss';
import Image from 'next/image';
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
  imageSrcArray: string[];
  currentIndex: number;
  height: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function ImageSlide({
  imageSrcArray,
  currentIndex,
  height,
  onPrev,
  onNext,
}: ImageSlideProps) {
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(onNext, onPrev);
  const total = imageSrcArray.length;

  return (
    <div
      className={styles.slideContainer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          display: 'flex',
          width: `${100 * total}%`,
          transform: `translateX(-${(100 / total) * currentIndex}%)`,
          transition: 'transform 0.5s',
        }}
      >
        {imageSrcArray.map((src, idx) => (
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
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
      <NavigationButtons onPrev={onPrev} onNext={onNext} />
    </div>
  );
}
