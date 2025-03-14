import DetailViewModal from '@/components/DetailViewModal';
import StageView from '@/components/StageView';

const DetailModal = ({ params }) => {
  const { stadiumId } = params;

  return (
    <DetailViewModal>
      <StageView stageSVGSrc={`/stadium/${stadiumId}.svg`} />
    </DetailViewModal>
  );
};

export default DetailModal;
