'use client';

import MiniMap from '../MiniMap/MiniMap';
import styles from './StageView.module.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useStageTransform } from '@/hooks/common/useStageTransform';
import { getStadiumAssetUrl } from '@/utils/getAssetUrl';
import { parseBtnId } from '@/utils/parseBtnId';

const svgCache: Record<number, string> = {};
const svgRequestCache: Record<number, Promise<string>> = {};

interface StageViewProps {
  stadiumId: number;
  selectedSectionId: number | null;
  onSelectSection: (info: { sectionId: number; sectionName: string }) => void;
}

const StageView = ({ stadiumId, selectedSectionId, onSelectSection }: StageViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const minimapRef = useRef<HTMLDivElement>(null);
  const [innerHTML, setInnerHTML] = useState<string | undefined>(svgCache[stadiumId]);
  const svgUrl = getStadiumAssetUrl(stadiumId);

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

  // 줌 및 드래그 이벤트 등록
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

  // stadiumId 변경 시 SVG fetch 또는 캐시 활용
  useEffect(() => {
    // 캐시에 있으면 바로 사용
    if (svgCache[stadiumId]) {
      setInnerHTML(svgCache[stadiumId]);
      return;
    }

    // 요청 캐시가 없으면 fetch 시작
    let ignore = false;
    const fetchSvg = async () => {
      if (!svgRequestCache[stadiumId]) {
        svgRequestCache[stadiumId] = fetchStageSvg(stadiumId);
      }

      try {
        const data = await svgRequestCache[stadiumId];
        if (!ignore) {
          svgCache[stadiumId] = data;
          setInnerHTML(svgCache[stadiumId]);
        }
      } catch (err) {
        console.error('Error fetching SVG:', stadiumId, svgUrl, err);
      }
    };

    fetchSvg();

    return () => {
      ignore = true;
    };
  }, [stadiumId]);

  // 페이지 복귀 시, 기존 선택 상태 복원
  useEffect(() => {
    if (selectedSectionId === null || !wrapperRef.current) return;

    const svg = wrapperRef.current.querySelector('svg');
    if (!svg) return;

    svg.querySelectorAll('g[id^="btn"]').forEach((g) => {
      g.classList.remove(styles.selected);

      const { sectionId } = parseBtnId(g.id);
      if (sectionId === selectedSectionId) {
        g.classList.add(styles.selected);
        svg.classList.add(styles.gHasSelection);
      }
    });
  }, []);

  // 사용자가 구역을 클릭했을 때: 선택 상태 업데이트 및 외부에 section 정보 전달
  const handleSVGClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as Element;
    const group = target.closest('g[id^="btn"]');
    if (!group) return;

    const svg = wrapperRef.current?.querySelector('svg');
    if (!svg) return;

    // 모두 해제
    svg.querySelectorAll('g[id^="btn"]').forEach((g) => g.classList.remove(styles.selected));

    // 클릭된 것만 selected 추가
    svg.classList.add(styles.gHasSelection);
    svg.querySelector(`g[id="${group.id}"]`)!.classList.add(styles.selected);

    const { sectionId, sectionName } = parseBtnId(group.id);
    if (!sectionId) return;

    onSelectSection({ sectionId, sectionName });
  };

  return (
    <>
      <MiniMap
        stageSVGSrc={svgUrl}
        minimapRef={minimapRef}
        containerAspectRatio={containerAspectRatio}
        viewportBox={viewportBox}
      />
      <div className={styles.container} ref={containerRef}>
        <div
          ref={wrapperRef}
          className={styles.imageWrapper}
          onClick={handleSVGClick}
          dangerouslySetInnerHTML={useMemo(
            () => (innerHTML ? { __html: innerHTML } : undefined),
            [innerHTML],
          )}
        />
      </div>
    </>
  );
};

export default StageView;

async function fetchStageSvg(id: number) {
  const response = await fetch(getStadiumAssetUrl(id));
  return response.text();
}
