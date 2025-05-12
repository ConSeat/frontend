import PhotoModal from '@/components/PhotoModal/PhotoModal';

const DetailPage = async ({ params }) => {
  const { stadiumId, seatingId, reviewId } = await params;

  return <PhotoModal stadiumId={stadiumId} seatingId={seatingId} reviewId={reviewId} />;
};

export default DetailPage;
