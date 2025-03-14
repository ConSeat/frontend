import DetailViewModal from '@/components/DetailViewModal';
import StageView from '@/components/StageView';

const DetailPage = ({ params }) => {
  const { stadiumId } = params;

  return (
    <DetailViewModal>
      <StageView stageSVGSrc={`/stadium/${stadiumId}.svg`} />
    </DetailViewModal>
  );
};

export default DetailPage;
