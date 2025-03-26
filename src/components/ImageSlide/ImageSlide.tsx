'use client';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './ImageSlide.module.scss';
import { TouchEventHandler, useRef } from 'react';

interface ImageSlideProps {
  imageSrcArray: string[];
  currentIndex: number;
  height: number;
  onNext: () => void;
  onPrev: () => void;
}

const ImageSlide = ({ currentIndex, imageSrcArray, height, onPrev, onNext }: ImageSlideProps) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const endXRef = useRef<number>(0);
  const totalLength = imageSrcArray.length;

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
    startXRef.current = event.touches[0].clientX;
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (event) => {
    endXRef.current = event.touches[0].clientX;
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = () => {
    const diffX = startXRef.current - endXRef.current;

    if (Math.abs(diffX) > 0) {
      if (diffX < 0) {
        onPrev();
      } else {
        onNext();
      }
    }
  };

  return (
    <div
      className={styles.slideContainer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={imageRef}
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
