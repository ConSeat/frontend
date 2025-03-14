import DetailViewModal from '@/components/DetailViewModal';
import StageView from '@/components/StageView';

const DetailPage = async ({ params }) => {
  const { stadiumId } = await params;

  return (
    <DetailViewModal>
      <StageView stageSVGSrc={`/stadium/${stadiumId}.svg`} />
    </DetailViewModal>
  );
};

export default DetailPage;
