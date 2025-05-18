import HomeClient from './_components/HomeClient/HomeClient';
import { HydrationBoundary } from '@tanstack/react-query';
import SecondBackground from '@/components/Background/SecondBackground';
import { stadiumQueries } from '@/apis/stadium/stadium.query';
import { createPrefetchedQueryClient } from '@/utils/createPrefetchedQueryClient';

const HomePage = async () => {
  const { dehydratedState } = await createPrefetchedQueryClient([stadiumQueries.list]);

  return (
    <>
      <SecondBackground />
      <HydrationBoundary state={dehydratedState}>
        <HomeClient />
      </HydrationBoundary>
    </>
  );
};

export default HomePage;
