'use client';

import { useEffect, useRef, useState } from 'react';

type ScrollDirection = 'up' | 'down';

/**
 * useScrollDirection
 * - 반환값: 'up' | 'down' | null (초기에는 아직 방향 없음)
 * - window 스크롤이 위로 움직이면 'up', 아래로 움직이면 'down'을 반환
 */
function useScrollDirection(): ScrollDirection | null {
  const [direction, setDirection] = useState<ScrollDirection | null>(null);
  const prevScrollY = useRef(0);

  useEffect(() => {
    // 마운트 시점의 초기 스크롤 위치 기록
    prevScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > prevScrollY.current) {
        setDirection('down');
      } else if (currentY < prevScrollY.current) {
        setDirection('up');
      }
      prevScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return direction;
}

export default useScrollDirection;
