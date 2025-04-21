import { useRef, useState } from 'react';
import { clamp } from '@/utils/clamp';

const TOUCH_TYPE = {
  DRAG: 1,
  ZOOM: 2,
} as const;

const ZOOM_LIMIT = {
  MIN: 1,
  MAX: 3,
};

const DEFAULT_ASPECT_RATIO = 640 / 390;

const WHEEL_ZOOM_STEP = 0.1;

export const useStageTransform = ({
  wrapperRef,
  containerRef,
  minimapRef,
}: {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  minimapRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const dragState = useRef({
    isDragging: false,
    scale: 1,
    translateX: 0,
    translateY: 0,
    startX: 0,
    startY: 0,
    touchDistance: 0,
  });

  const [viewportBox, setViewportBox] = useState({
    scale: 1,
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });
  const [containerAspectRatio, setContainerAspectRatio] = useState(DEFAULT_ASPECT_RATIO);

  // 드래그/확대된 상태에 따라 이미지가 이동할 수 있는 최대 범위를 계산
  const getTranslateLimits = () => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const scale = dragState.current.scale;

    if (!container || !wrapper) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }

    const wrapperWidth = wrapper.offsetWidth * scale;
    const wrapperHeight = wrapper.offsetHeight * scale;
    const containerRect = container.getBoundingClientRect();

    const xCenterFix = (wrapperWidth - containerRect.width) / 2;
    const yCenterFix = (wrapperHeight - containerRect.height) / 2;

    const minX = -xCenterFix;
    const maxX = xCenterFix;

    const minY = -yCenterFix;
    const maxY = yCenterFix;

    return { minX, maxX, minY, maxY };
  };

  // 실제로 이동된 위치 + 확대 비율을 적용
  // clamp로 이동이 화면 밖으로 나가지 않도록 제한함
  const updateTransform = () => {
    if (!wrapperRef.current || !containerRef.current) return;

    const limits = getTranslateLimits();

    let { translateX, translateY } = dragState.current;

    translateX = clamp(translateX, limits.minX, limits.maxX);
    translateY = clamp(translateY, limits.minY, limits.maxY);

    dragState.current.translateX = translateX;
    dragState.current.translateY = translateY;

    wrapperRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${dragState.current.scale})`;

    updateViewportBox();
  };

  const updateViewportBox = () => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const minimap = minimapRef.current;
    if (!container || !wrapper || !minimap) return;

    const { scale, translateX, translateY } = dragState.current;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    if (containerHeight !== 0) {
      setContainerAspectRatio(containerWidth / containerHeight);
    }

    const imageWidth = wrapper.offsetWidth;
    const imageHeight = wrapper.offsetHeight;

    const minimapWidth = minimap.offsetWidth;
    const minimapHeight = minimap.offsetHeight;

    const visibleWidth = containerWidth / scale;
    const visibleHeight = containerHeight / scale;

    const offsetX = (imageWidth - visibleWidth) / 2 - translateX / scale;
    const offsetY = (imageHeight - visibleHeight) / 2 - translateY / scale;

    const scaleX = minimapWidth / imageWidth;
    const scaleY = minimapHeight / imageHeight;

    setViewportBox({
      scale,
      width: visibleWidth * scaleX,
      height: visibleHeight * scaleY,
      left: offsetX * scaleX,
      top: offsetY * scaleY,
    });
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -WHEEL_ZOOM_STEP : WHEEL_ZOOM_STEP;
    dragState.current.scale = Math.min(
      Math.max(ZOOM_LIMIT.MIN, dragState.current.scale + delta),
      ZOOM_LIMIT.MAX,
    );
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

    if (e.touches.length === TOUCH_TYPE.DRAG) {
      // 단일 터치: 드래그
      dragState.current.isDragging = true;
      dragState.current.startX = e.touches[0].clientX - dragState.current.translateX;
      dragState.current.startY = e.touches[0].clientY - dragState.current.translateY;
    } else if (e.touches.length === TOUCH_TYPE.ZOOM) {
      // 두 손가락: 핀치 줌
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      dragState.current.touchDistance = Math.sqrt(dx * dx + dy * dy);
      dragState.current.isDragging = false;
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === TOUCH_TYPE.DRAG && dragState.current.isDragging) {
      // 단일 터치 드래그
      dragState.current.translateX = e.touches[0].clientX - dragState.current.startX;
      dragState.current.translateY = e.touches[0].clientY - dragState.current.startY;

      updateTransform();
    } else if (e.touches.length === TOUCH_TYPE.ZOOM && dragState.current.touchDistance !== null) {
      // 핀치 줌
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;

      const newDistance = Math.sqrt(dx * dx + dy * dy);
      const scaleChange = newDistance / dragState.current.touchDistance;

      dragState.current.scale = Math.min(
        Math.max(ZOOM_LIMIT.MIN, dragState.current.scale * scaleChange),
        ZOOM_LIMIT.MAX,
      );
      dragState.current.touchDistance = newDistance;

      updateTransform();
    }
  };

  // 터치 종료 (모바일)
  const handleTouchEnd = () => {
    dragState.current.isDragging = false;
    dragState.current.touchDistance = 0;
  };

  return {
    dragState,
    viewportBox,
    containerAspectRatio,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    updateTransform,
    updateViewportBox,
  };
};
