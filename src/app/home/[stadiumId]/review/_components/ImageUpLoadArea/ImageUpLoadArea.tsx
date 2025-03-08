import styles from './ImageUpLoadArea.module.scss';
import type { ChangeEventHandler, RefObject } from 'react';
import React from 'react';
import { MAX_IMAGE_UPLOAD_NUMBER } from '@/constants/review';

interface ImageUpLoadAreaProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClick: () => void;
  imageListLength: number;
}

const ImageUpLoadArea = React.memo(
  ({ fileInputRef, imageListLength, onChange, onClick }: ImageUpLoadAreaProps) => {
    return (
      <div>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={onClick}
          className={styles.uploadButton}
          disabled={imageListLength >= MAX_IMAGE_UPLOAD_NUMBER}
        >
          <span className={styles.uploadButtonText}>사진 올리기</span>
        </button>
      </div>
    );
  },
);

ImageUpLoadArea.displayName = 'ImageUpLoadArea';

export default ImageUpLoadArea;
