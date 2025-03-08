'use client';

import styles from './DetailViewModal.module.scss';
import { createPortal } from 'react-dom';
import Button from '@/components/Button/Button';
import { CloseCircle } from '@/assets';

interface DetailViewModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const DetailViewModal = ({ isOpen, children, onClose }: DetailViewModalProps) => {
  if (!isOpen) return null;

  const portal = document.getElementById('portal');

  if (portal === null) {
    console.error(
      'Portal element not found. Please ensure there is a <div id="portal"> in your layout.',
    );
    return null;
  }

  return createPortal(
    <div className={styles.overLay}>
      <div className={styles.header}>
        <div className={styles.subtitle}>도면보기</div>
        <Button className={styles.closeButtonSmall} onClick={onClose}>
          <CloseCircle />
        </Button>
      </div>
      <div className={styles.seatSection}>{children}</div>
      <Button className={styles.closeButtonLarge} onClick={onClose}>
        닫기
      </Button>
    </div>,
    portal,
  );
};

export default DetailViewModal;
