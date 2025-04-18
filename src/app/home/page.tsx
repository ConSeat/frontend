import HomeClient from './_components/HomeClient/HomeClient';
import { HydrationBoundary } from '@tanstack/react-query';
import { stadiumQueries } from '@/apis/stadium/stadium.query';
import { createPrefetchedQueryClient } from '@/utils/createPrefetchedQueryClient';

export default async function HomePage() {
  const { dehydratedState } = await createPrefetchedQueryClient([stadiumQueries.list]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeClient />
    </HydrationBoundary>
  );
}
