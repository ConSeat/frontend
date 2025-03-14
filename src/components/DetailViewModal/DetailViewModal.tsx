'use client';

import Modal from '../Modal';
import styles from './DetailViewModal.module.scss';
import useModal from '@/hooks/useModal';
import Button from '@/components/Button/Button';

interface DetailViewModalProps {
  children: React.ReactNode;
}

const DetailViewModal = ({ children }: DetailViewModalProps) => {
  const { handleCloseModal } = useModal();

  return (
    <Modal>
      <Modal.Content>
        <Modal.Title title="도면보기" onClose={handleCloseModal} />
        <div className={styles.stadiumSection}>{children}</div>
        <Button variant="secondary" onClick={handleCloseModal}>
          닫기
        </Button>
      </Modal.Content>
    </Modal>
  );
};

export default DetailViewModal;
