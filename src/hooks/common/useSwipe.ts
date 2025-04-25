import { TouchEventHandler, useRef } from 'react';

const MINIMUM_SWIPE_PIXEL = 40;

const useSwipe = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  const startXRef = useRef(0);
  const endXRef = useRef(0);
  const isMoveRef = useRef(false);

  const handleTouchStart: TouchEventHandler = (event) => {
    startXRef.current = event.touches[0].clientX;
  };

  const handleTouchMove: TouchEventHandler = (event) => {
    endXRef.current = event.touches[0].clientX;
    isMoveRef.current = true;
  };

  const handleTouchEnd: TouchEventHandler = () => {
    if (!isMoveRef.current) return;

    const diffX = startXRef.current - endXRef.current;

    if (Math.abs(diffX) < MINIMUM_SWIPE_PIXEL) return;

    if (diffX < 0) {
      onSwipeRight();
    } else {
      onSwipeLeft();
    }

    isMoveRef.current = false;
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};

export default useSwipe;
