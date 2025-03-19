import styles from './ImageList.module.scss';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
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
          <Button onClick={() => onClick(index)} className={styles.closeButton}>
            <Icon icon="Close" size={11} />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
