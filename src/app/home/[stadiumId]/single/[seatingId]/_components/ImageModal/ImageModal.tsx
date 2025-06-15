import styles from './ImageModal.module.scss';
import useImageSlide from '@/hooks/common/useImageSlide';
import ImageSlide from '@/components/ImageSlide';
import Modal from '@/components/Modal';
import Spacing from '@/components/Spacing/Spacing';
import { getDisplayIndex } from '@/utils/getDisplayIndex';

const ImageModal = ({ images, startIndex, onClose }) => {
  const total = images?.length ?? 0;
  const { imageIndex, handleClickNext, handleClickPrev, isTransitioning, sliderRef } =
    useImageSlide({ initialIdx: startIndex, totalImageNumber: total });

  const displayIndex = getDisplayIndex(imageIndex, total);

  return (
    <Modal>
      <Modal.Overlay onClick={onClose} className={styles.overlay} />
      <Modal.Content className={styles.content}>
        <Modal.Header title={`${displayIndex}/${total}`} onClose={onClose} />
        <ImageSlide
          imageSrcArray={images}
          currentIndex={imageIndex}
          height={400}
          onNext={handleClickNext}
          onPrev={handleClickPrev}
          isTransitioning={isTransitioning}
          slideRef={sliderRef}
        />
        <Spacing size={56} />
      </Modal.Content>
    </Modal>
  );
};

export default ImageModal;
