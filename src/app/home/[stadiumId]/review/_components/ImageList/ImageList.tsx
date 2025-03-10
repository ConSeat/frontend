import styles from './ImageList.module.scss';
import { CloseCircle } from '@/assets';
import type { ImageData } from '@/types/review';

interface ImageListProps {
  images: ImageData[];
  onClick: (index: number) => void;
}

const ImageList = ({ images, onClick }: ImageListProps) => {
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
};

export default ImageList;
