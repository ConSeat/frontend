import { notFound } from 'next/navigation';
import PhotoModal from '@/components/PhotoModal/PhotoModal';
import { getReviewImages } from '@/apis/review/review.api';
import { getSeatingReviews } from '@/apis/review/seating.api';

const DetailPage = async ({ params }) => {
  const { stadiumId, seatingId, reviewId } = params;

  if (!stadiumId || !seatingId || !reviewId) {
    notFound();
  }

  const seatInfo = await getSeatingReviews(Number(seatingId));
  if (!seatInfo) {
    notFound();
  }

  const reviewImages = await getReviewImages(Number(reviewId));
  if (!reviewImages) {
    notFound();
  }

  return <PhotoModal stadiumId={stadiumId} seatingId={seatingId} reviewId={reviewId} />;
};

export default DetailPage;
