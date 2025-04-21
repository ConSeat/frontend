import { TouchEventHandler, useRef } from 'react';

const MINIMUM_SWIPE_PIXEL = 40;

const useSwipe = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  const startXRef = useRef(0);
  const endXRef = useRef(0);

  const handleTouchStart: TouchEventHandler = (event) => {
    startXRef.current = event.touches[0].clientX;
  };

  const handleTouchMove: TouchEventHandler = (event) => {
    endXRef.current = event.touches[0].clientX;
  };

  const handleTouchEnd: TouchEventHandler = () => {
    const diffX = startXRef.current - endXRef.current;

    if (Math.abs(diffX) < MINIMUM_SWIPE_PIXEL) return;

    if (diffX < 0) {
      onSwipeRight();
    } else {
      onSwipeLeft();
    }
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};

export default useSwipe;
