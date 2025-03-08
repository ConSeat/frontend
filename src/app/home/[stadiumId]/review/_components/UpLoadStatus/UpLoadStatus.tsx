import styles from './UpLoadStatus.module.scss';
import React from 'react';
import { MAX_IMAGE_UPLOAD_NUMBER } from '@/constants/review';

interface UpLoadStatusProps {
  imageListLength: number;
}

const UpLoadStatus = React.memo(({ imageListLength }: UpLoadStatusProps) => {
  return (
    <div>
      <div className={styles.description}>{imageListLength}장 첨부</div>
      <div className={styles.description}>
        (
        {imageListLength === MAX_IMAGE_UPLOAD_NUMBER ? (
          '첨부 가능한 사진을 다 올렸어요'
        ) : (
          <>
            <span className={styles.last}>{MAX_IMAGE_UPLOAD_NUMBER - imageListLength}장 </span>더
            올릴 수 있어요
          </>
        )}
        )
      </div>
    </div>
  );
});

UpLoadStatus.displayName = 'UpLoadStatus';

export default UpLoadStatus;
