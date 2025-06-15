import { notFound } from 'next/navigation';
import PhotoModal from '@/components/PhotoModal/PhotoModal';
import { getReviewImages } from '@/apis/review/review.api';
import { getSeatingReviews } from '@/apis/review/seating.api';

const DetailPage = async ({ params }) => {
  const { stadiumId, seatingId, reviewId } = await params;

  if (!stadiumId || !seatingId || !reviewId) {
    notFound();
  }

  await getSeatingReviews(Number(seatingId));

  await getReviewImages(Number(reviewId));

  return <PhotoModal reviewId={reviewId} />;
};

export default DetailPage;
