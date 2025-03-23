'use client';

import Modal from '../Modal';
import styles from './DetailViewModal.module.scss';
import useModal from '@/hooks/useModal';
import Button from '@/components/Button/Button';

interface DetailViewModalProps {
  children: React.ReactNode;
}

const DetailViewModal = ({ children }: DetailViewModalProps) => {
  const { closeModal } = useModal({ type: 'router' });

  return (
    <Modal>
      <Modal.Overlay onClick={() => {}} className={styles.overlay} />
      <Modal.Content>
        <Modal.Header title="도면보기" onClose={closeModal} />
        <div className={styles.stadiumSection}>{children}</div>
        <Button variant="secondary" onClick={closeModal}>
          닫기
        </Button>
      </Modal.Content>
    </Modal>
  );
};

export default DetailViewModal;
