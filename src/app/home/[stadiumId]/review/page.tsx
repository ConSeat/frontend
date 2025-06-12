import ReviewContainer from './_components/ReviewContainer';
import { HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getStadiumList } from '@/apis/stadium/stadium.api';
import { stadiumQueries } from '@/apis/stadium/stadium.query';
import { createPrefetchedQueryClient } from '@/utils/createPrefetchedQueryClient';
import { getMetadata } from '@/utils/getMetadata';
import { findStadiumById } from '@/utils/stadium';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { stadiumId } = await params;

  const { data: stadiumList } = await getStadiumList();
  const stadium = findStadiumById(stadiumList.active, Number(stadiumId));

  if (!stadium) notFound();

  const title = `${stadium.stadiumName} | 내 시야 후기 작성`;
  const asPath = `/home/${stadiumId}/review`;

  return getMetadata({
    title,
    asPath,
  });
}

const ReviewPage = async ({ params }) => {
  const { stadiumId } = await params;

  const { dehydratedState } = await createPrefetchedQueryClient([
    stadiumQueries.concerts(stadiumId),
    stadiumQueries.seats(stadiumId),
    stadiumQueries.features,
    stadiumQueries.obstructions,
  ]);

  console.log("dehydratedState", dehydratedState)

  return (
    <HydrationBoundary state={dehydratedState}>
      <ReviewContainer stadiumId={Number(stadiumId)} />
    </HydrationBoundary>
  );
};

export default ReviewPage;
