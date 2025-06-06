import { useEffect, useRef, useState } from 'react';

interface UseImageSlideProps {
  initialIdx?: number;
  totalImageNumber: number;
}

const useImageSlide = ({ initialIdx = 1, totalImageNumber }: UseImageSlideProps) => {
  const [imageIndex, setIndex] = useState(initialIdx);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleClickNext = () => {
    if (imageIndex >= totalImageNumber + 1) return;
    setIsTransitioning(true);
    setIndex((prev) => prev + 1);
  };

  const handleClickPrev = () => {
    if (imageIndex <= 0) return;
    setIsTransitioning(true);
    setIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleTransitionEnd = () => {
      if (imageIndex === totalImageNumber + 1) {
        setIsTransitioning(false);
        setIndex(1);
      }

      if (imageIndex === 0) {
        setIsTransitioning(false);
        setIndex(totalImageNumber);
      }
    };

    slider.addEventListener('transitionend', handleTransitionEnd);
    return () => slider.removeEventListener('transitionend', handleTransitionEnd);
  }, [imageIndex, totalImageNumber]);

  return {
    imageIndex,
    isTransitioning,
    sliderRef,
    handleClickNext,
    handleClickPrev,
  };
};

export default useImageSlide;
