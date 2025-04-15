'use client';

import { REVIEW } from '../../_constants/review';
import ImageList from '../ImageList';
import ImageUpLoadArea from '../ImageUpLoadArea';
import UpLoadStatus from '../UpLoadStatus/UpLoadStatus';
import React, { ChangeEventHandler, useRef } from 'react';
import Splitter from '@/components/Splitter/Splitter';
import type { ImageData, ReviewDispatch } from '@/types/review';

interface SeatImageProps {
  data: ImageData[];
  dispatch: ReviewDispatch;
}

const SeatImage = ({ data, dispatch }: SeatImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files === null) return;

    const file = e.target.files[0];
    const newImage = {
      file,
      previewUrl: URL.createObjectURL(file),
    };

    dispatch({
      type: REVIEW.ACTIONS.IMAGE_UPLOAD,
      payload: {
        image: newImage,
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
        imageListLength={data.length}
        onChange={handleFileChange}
        onClick={handleButtonClick}
      />
      {data.length > 0 && (
        <>
          <Splitter color="subGray6" />
          <UpLoadStatus imageListLength={data.length} />
          <ImageList images={data} onClick={handleRemoveButtonClick} />
        </>
      )}
    </>
  );
};

export default React.memo(SeatImage);
