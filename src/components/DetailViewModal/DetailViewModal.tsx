'use client';

import Modal from '../Modal';
import styles from './DetailViewModal.module.scss';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { CloseCircle } from '@/assets';

interface DetailViewModalProps {
  children: React.ReactNode;
}

const DetailViewModal = ({ children }: DetailViewModalProps) => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  return (
    <Modal overlayStyle="default">
      <div className={styles.overlay}>
        <div className={styles.header}>
          <div className={styles.subtitle}>도면보기</div>
          <Button className={styles.closeButtonSmall} onClick={handleClose}>
            <CloseCircle />
          </Button>
        </div>
        <div className={styles.stadiumSection}>{children}</div>
        <Button className={styles.closeButtonLarge} onClick={handleClose}>
          닫기
        </Button>
      </div>
    </Modal>
  );
};

export default DetailViewModal;
