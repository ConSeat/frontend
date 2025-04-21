import { useState } from 'react';

const useImageSlide = (totalImageNumber: number) => {
  const [imageIndex, setImageIndex] = useState(1);

  const handleClickNext = () => {
    const nextIdx = imageIndex + 1 > totalImageNumber ? 1 : imageIndex + 1;
    setImageIndex(nextIdx);
  };

  const handleClickPrev = () => {
    const nextIdx = imageIndex - 1 <= 0 ? totalImageNumber : imageIndex - 1;
    setImageIndex(nextIdx);
  };

  return { imageIndex, handleClickNext, handleClickPrev };
};

export default useImageSlide;
