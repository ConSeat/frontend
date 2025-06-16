import { notFound } from 'next/navigation';
import PhotoModal from '@/components/PhotoModal/PhotoModal';
import { getReviewImages } from '@/apis/review/review.api';
import { getSeatingReviews } from '@/apis/review/seating.api';
import { fetchOrHandle } from '@/utils/fetchOrHandle';

const DetailPage = async ({ params }) => {
  const { stadiumId, seatingId, reviewId } = await params;

  if (!stadiumId || !seatingId || !reviewId) {
    notFound();
  }

  await fetchOrHandle(() => getSeatingReviews(Number(seatingId)));
  await fetchOrHandle(() => getReviewImages(Number(reviewId)));

  return <PhotoModal reviewId={reviewId} />;
};

export default DetailPage;
