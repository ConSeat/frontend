import ReviewContainer from './_components/ReviewContainer';
import { HydrationBoundary } from '@tanstack/react-query';
import { stadiumQueries } from '@/apis/stadium/stadium.query';
import { createPrefetchedQueryClient } from '@/utils/createPrefetchedQueryClient';

const ReviewPage = async ({ params }) => {
  const { stadiumId } = await params;

  const { dehydratedState } = await createPrefetchedQueryClient([
    stadiumQueries.concerts(stadiumId),
    stadiumQueries.seats(stadiumId),
    stadiumQueries.features,
    stadiumQueries.obstructions,
  ]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ReviewContainer stadiumId={Number(stadiumId)} />
    </HydrationBoundary>
  );
};

export default ReviewPage;
