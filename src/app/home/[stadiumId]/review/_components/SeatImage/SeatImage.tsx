'use client';

import { MAX_IMAGE_UPLOAD_NUMBER } from '../../_constants/info';
import { REVIEW } from '../../_constants/review';
import ImageList from '../ImageList';
import ImageUpLoadArea from '../ImageUpLoadArea';
import UpLoadStatus from '../UpLoadStatus/UpLoadStatus';
import React, { ChangeEventHandler, useRef } from 'react';
import Splitter from '@/components/Splitter/Splitter';
import { useToast } from '@/providers/ToastProvider';
import type { ImageData, ReviewDispatch } from '@/types/review';

interface SeatImageProps {
  data: ImageData[];
  dispatch: ReviewDispatch;
}

const SeatImage = ({ data, dispatch }: SeatImageProps) => {
  const { activateToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files === null) return;

    const selectedFiles = Array.from(e.target.files);
    const remainingSlots = MAX_IMAGE_UPLOAD_NUMBER - data.length;

    if (selectedFiles.length > remainingSlots) {
      activateToast(`최대 ${MAX_IMAGE_UPLOAD_NUMBER}장까지만 업로드할 수 있어요.`, 'Waring');
    }

    const filesToUpload = selectedFiles.slice(0, remainingSlots);

    filesToUpload.forEach((file) => {
      const newImage = {
        file,
        previewUrl: URL.createObjectURL(file),
      };

      dispatch({
        type: REVIEW.ACTIONS.IMAGE_UPLOAD,
        payload: { image: newImage },
      });
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
