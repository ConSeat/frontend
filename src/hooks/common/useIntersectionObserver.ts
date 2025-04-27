import { useEffect, useRef } from 'react';

const useIntersectionObserver = (callback: () => void) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    });

    const targetElement = targetRef.current;

    if (targetElement) {
      observerRef.current.observe(targetElement);
    }

    return () => {
      if (targetElement) observerRef.current?.unobserve(targetElement);
    };
  }, [callback]);

  return targetRef;
};

export default useIntersectionObserver;
