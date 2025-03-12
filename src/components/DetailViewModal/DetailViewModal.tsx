'use client';

import Modal from '../Modal';
import styles from './DetailViewModal.module.scss';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';

interface DetailViewModalProps {
  children: React.ReactNode;
}

const DetailViewModal = ({ children }: DetailViewModalProps) => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  return (
    <Modal>
      <Modal.Content>
        <Modal.Title title="도면보기" onClose={handleClose} />
        <div className={styles.stadiumSection}>{children}</div>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Content>
    </Modal>
  );
};

export default DetailViewModal;
