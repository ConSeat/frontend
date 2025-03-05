'use client';

import styles from './SeatImage.module.scss';
import { ChangeEventHandler, useRef } from 'react';
import Splitter from '@/components/Splitter/Splitter';
import { CloseCircle } from '@/assets';
import { REVIEW } from '@/constants/review';
import type { ImageData, ReviewDispatch } from '@/types/review';

interface SeatImageProps {
  images: ImageData[];
  dispatch: ReviewDispatch;
}

const MAX_IMAGE_UPLOAD_NUMBER = 4;

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

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className={styles.textWrapper}>
        <div className={styles.uploadTitle}>시야 사진을 등록해주세요</div>
        <div className={styles.uploadDescription}>
          *방해요소, 거리감이 잘 느껴지는 사진이면 좋아요
        </div>
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className={styles.uploadButton}
          disabled={images.length >= MAX_IMAGE_UPLOAD_NUMBER}
        >
          <span className={styles.uploadButtonText}>사진 올리기</span>
        </button>
      </div>
      {images.length > 0 && (
        <>
          <Splitter width="100%" height="0.8px" color="subGray6" />
          <div>
            <div className={styles.description}>{images.length}장 첨부</div>
            <div className={styles.description}>
              (
              {images.length === MAX_IMAGE_UPLOAD_NUMBER ? (
                '첨부 가능한 사진을 다 올렸어요'
              ) : (
                <>
                  <span className={styles.last}>{MAX_IMAGE_UPLOAD_NUMBER - images.length}장 </span>
                  더 올릴 수 있어요
                </>
              )}
              )
            </div>
          </div>
          <div></div>
          <div className={styles.imageList}>
            {images.map((img) => (
              <div key={img.previewUrl} className={styles.imageItem}>
                <img src={img.previewUrl} />
                <button>
                  <CloseCircle />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default SeatImage;
