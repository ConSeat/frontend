import { useState } from 'react';

interface UseImageSlideProps {
  initialIdx: number;
  totalImageNumber: number;
}

const useImageSlide = ({ initialIdx, totalImageNumber }: UseImageSlideProps) => {
  const [imageIndex, setImageIndex] = useState(initialIdx);

  const handleClickNext = () => {
    const nextIdx = imageIndex >= totalImageNumber - 1 ? 0 : imageIndex + 1;
    setImageIndex(nextIdx);
  };

  const handleClickPrev = () => {
    const nextIdx = imageIndex <= 0 ? totalImageNumber - 1 : imageIndex - 1;
    setImageIndex(nextIdx);
  };

  return { imageIndex, handleClickNext, handleClickPrev };
};

export default useImageSlide;
