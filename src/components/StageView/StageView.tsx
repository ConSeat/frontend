'use client';

import MiniMap from '../MiniMap/MiniMap';
import styles from './StageView.module.scss';
import { useEffect, useRef } from 'react';
import { useStageTransform } from '@/hooks/useStageTransform';
import { Stadium001 } from '@/assets';

interface StageViewProps {
  stageSVGSrc: string;
}

const StageView = ({ stageSVGSrc }: StageViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const minimapRef = useRef<HTMLDivElement>(null);

  const {
    viewportBox,
    containerAspectRatio,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useStageTransform({ containerRef, wrapperRef, minimapRef });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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

  const handleSVGClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const target = e.target as HTMLElement;
    const group = target.closest('g');
    if (group?.id.startsWith('btn')) {
      console.log('Clicked ID:', group.id);
    }
  };

  return (
    <>
      <MiniMap
        stageSVGSrc={stageSVGSrc}
        minimapRef={minimapRef}
        containerAspectRatio={containerAspectRatio}
        viewportBox={viewportBox}
      />

      <div className={styles.container} ref={containerRef}>
        <div className={styles.imageWrapper} ref={wrapperRef}>
          <Stadium001 alt="무대 이미지" width={316} height={292} onClick={handleSVGClick} />
        </div>
      </div>
    </>
  );
};

export default StageView;
