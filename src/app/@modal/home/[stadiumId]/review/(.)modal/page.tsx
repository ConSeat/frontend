'use client';

import { usePathname } from 'next/navigation';
import DetailViewModal from '@/components/DetailViewModal';
import Modal from '@/components/Modal';
import StageView from '@/components/StageView';

const ReviewModal = () => {
  const pathname = usePathname();
  const stadiumId = pathname.split('/')[2];

  return (
    <Modal overlayStyle="default">
      <DetailViewModal>
        <StageView stageSVGSrc={`/stadium/${stadiumId}.svg`} />
      </DetailViewModal>
    </Modal>
  );
};

export default ReviewModal;
