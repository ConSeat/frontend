import styles from './ImageList.module.scss';
import React from 'react';
import { CloseCircle } from '@/assets';
import type { ImageData } from '@/types/review';

interface ImageListProps {
  images: ImageData[];
  onClick: (index: number) => void;
}

const ImageList = React.memo(({ images, onClick }: ImageListProps) => {
  return (
    <div className={styles.imageList}>
      {images.map((img, index) => (
        <div key={img.previewUrl} className={styles.imageItem}>
          <img src={img.previewUrl} alt="" />
          <button onClick={() => onClick(index)}>
            <CloseCircle />
          </button>
        </div>
      ))}
    </div>
  );
});

ImageList.displayName = 'ImageList';

export default ImageList;
