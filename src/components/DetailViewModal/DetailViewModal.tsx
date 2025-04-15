'use client';

import Modal from '../Modal';
import styles from './DetailViewModal.module.scss';
import useRouterModal from '@/hooks/useRouterModal';
import Button from '@/components/Button/Button';

interface DetailViewModalProps {
  stadiumId: number;
  children: React.ReactNode;
}

const DetailViewModal = ({ stadiumId, children }: DetailViewModalProps) => {
  const { closeModal } = useRouterModal({
    modalPath: `/home/${stadiumId}/review/detail`,
    fallbackPath: `/home/${stadiumId}/review`,
  });

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
