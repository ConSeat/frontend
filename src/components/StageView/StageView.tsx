'use client';

import MiniMap from '../MiniMap/MiniMap';
import styles from './StageView.module.scss';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { useStageTransform } from '@/hooks/useStageTransform';
import { Stadium001 } from '@/assets';

interface StageViewProps {
  stageSVGSrc: string;
  selectedId: string | null;
  onSelectSection: (sectionId: string) => void;
}

const StageView = ({ stageSVGSrc, selectedId, onSelectSection }: StageViewProps) => {
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
    const svg = e.currentTarget;
    const target = e.target as Element;
    const group = target.closest('g[id^="btn"]') as SVGGElement | null;

    if (!group) return;

    // 모든 선택 해제
    const allGroups = svg.querySelectorAll('g[id^="btn"]');
    allGroups.forEach((g) => {
      g.classList.remove(styles.selected);
    });

    // 선택한 g태그에 selected 클래스 추가
    group.classList.add(styles.selected);

    onSelectSection?.(group.id);
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
          <Stadium001
            alt="무대 이미지"
            width={316}
            height={292}
            onClick={handleSVGClick}
            className={classNames({ [styles.gHasSelection]: !!selectedId })}
          />
        </div>
      </div>
    </>
  );
};

export default StageView;
