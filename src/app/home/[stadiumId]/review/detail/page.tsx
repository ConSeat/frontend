import Image from 'next/image';
import DetailViewModal from '@/components/DetailViewModal';

const DetailPage = async ({ params }) => {
  const { stadiumId } = await params;

  return (
    <DetailViewModal stadiumId={stadiumId}>
      <Image src={`/stadium/${stadiumId}.svg`} width={316} height={291} alt="" />
    </DetailViewModal>
  );
};

export default DetailPage;
