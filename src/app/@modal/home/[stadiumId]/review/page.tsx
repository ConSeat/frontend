'use client';

import { usePathname } from 'next/navigation';
import DetailViewModal from '@/components/DetailViewModal';
import StageView from '@/components/StageView';

const ReviewModal = () => {
  const pathname = usePathname();
  const stadiumId = pathname.split('/')[2];

  return (
    <DetailViewModal>
      <StageView stageSVGSrc={`/stadium/${stadiumId}.svg`} />
    </DetailViewModal>
  );
};

export default ReviewModal;
