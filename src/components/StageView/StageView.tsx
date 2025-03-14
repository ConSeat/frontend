'use client';

import styles from './StageView.module.scss';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface StageViewProps {
  stageSVGSrc: string;
}

const MOBILE_DRAG = 1;
const MOBILE_ZOOM = 1;

const StageView = ({ stageSVGSrc }: StageViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const dragState = useRef({
    isDragging: false,
    scale: 1,
    translateX: 0,
    translateY: 0,
    startX: 0,
    startY: 0,
    touchDistance: 0,
  });

  const updateTransform = () => {
    if (wrapperRef.current === null) return;

    const { translateX, translateY, scale } = dragState.current;
    wrapperRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    dragState.current.scale = Math.min(Math.max(0.5, dragState.current.scale + delta), 3);
    updateTransform();
  };

  const handleMouseDown = (e: MouseEvent) => {
    dragState.current.isDragging = true;
    dragState.current.startX = e.clientX - dragState.current.translateX;
    dragState.current.startY = e.clientY - dragState.current.translateY;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragState.current.isDragging) return;
    e.preventDefault();
    dragState.current.translateX = e.clientX - dragState.current.startX;
    dragState.current.translateY = e.clientY - dragState.current.startY;
    updateTransform();
  };

  const handleMouseUp = () => {
    dragState.current.isDragging = false;
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (dragState.current === null) return;

    if (e.touches.length === MOBILE_DRAG) {
      // 단일 터치: 드래그
      dragState.current.isDragging = true;
      dragState.current.startX = e.touches[0].clientX - dragState.current.translateX;
      dragState.current.startY = e.touches[0].clientY - dragState.current.translateY;
    } else if (e.touches.length === MOBILE_ZOOM) {
      // 두 손가락: 핀치 줌
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      dragState.current.touchDistance = Math.sqrt(dx * dx + dy * dy);
      dragState.current.isDragging = false;
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === MOBILE_DRAG && dragState.current.isDragging) {
      // 단일 터치 드래그
      dragState.current.translateX = e.touches[0].clientX - dragState.current.startX;
      dragState.current.translateY = e.touches[0].clientY - dragState.current.startY;

      updateTransform();
    } else if (e.touches.length === MOBILE_ZOOM && dragState.current.touchDistance !== null) {
      // 핀치 줌
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;

      const newDistance = Math.sqrt(dx * dx + dy * dy);
      const scaleChange = newDistance / dragState.current.touchDistance;

      dragState.current.scale = Math.min(Math.max(0.5, dragState.current.scale * scaleChange), 3);
      dragState.current.touchDistance = newDistance;

      updateTransform();
    }
  };

  // 터치 종료 (모바일)
  const handleTouchEnd = () => {
    dragState.current.isDragging = false;
    dragState.current.touchDistance = 0;
  };

  useEffect(() => {
    if (containerRef.current === null) return;
    const container = containerRef.current;

    container.addEventListener('wheel', handleWheel);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.imageWrapper} ref={wrapperRef}>
        <Image
          src={stageSVGSrc}
          alt="무대 이미지"
          width={316}
          height={292}
          style={{ display: 'block', pointerEvents: 'none' }}
        />
      </div>
    </div>
  );
};

export default StageView;
