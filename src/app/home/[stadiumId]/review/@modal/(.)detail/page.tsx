import Image from 'next/image';
import DetailViewModal from '@/components/DetailViewModal';
import { getStadiumAssetUrl } from '@/utils/getAssetUrl';

const DetailModal = async ({ params }) => {
  const { stadiumId } = await params;

  return (
    <DetailViewModal stadiumId={stadiumId}>
      <Image src={getStadiumAssetUrl(stadiumId)} width={316} height={291} alt="" />
    </DetailViewModal>
  );
};

export default DetailModal;
