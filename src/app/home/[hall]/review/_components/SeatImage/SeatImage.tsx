'use client';

import ImageList from '../ImageList';
import ImageUpLoadArea from '../ImageUpLoadArea';
import UpLoadStatus from '../UpLoadStatus/UpLoadStatus';
import { ChangeEventHandler, useRef } from 'react';
import Splitter from '@/components/Splitter/Splitter';
import { REVIEW } from '@/constants/review';
import type { ImageData, ReviewDispatch } from '@/types/review';

interface SeatImageProps {
  images: ImageData[];
  dispatch: ReviewDispatch;
}

const SeatImage = ({ images, dispatch }: SeatImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files === null) return;

    const file = e.target.files[0];
    const newImages = {
      file,
      previewUrl: URL.createObjectURL(file),
    };

    dispatch({
      type: REVIEW.ACTIONS.IMAGE_UPLOAD,
      payload: {
        images: newImages,
      },
    });
  };

  const handleRemoveButtonClick = (index: number) => {
    dispatch({
      type: REVIEW.ACTIONS.IMAGE_REMOVE,
      payload: {
        removeImageIndex: index,
      },
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <ImageUpLoadArea
        fileInputRef={fileInputRef}
        imageListLength={images.length}
        onChange={handleFileChange}
        onClick={handleButtonClick}
      />
      {images.length > 0 && (
        <>
          <Splitter width="100%" height="0.8px" color="subGray6" />
          <UpLoadStatus imageListLength={images.length} />
          <ImageList images={images} onClick={handleRemoveButtonClick} />
        </>
      )}
    </>
  );
};

export default SeatImage;
