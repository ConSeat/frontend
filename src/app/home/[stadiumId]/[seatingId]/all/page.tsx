import AllReviewContainer from './_components/AllReviewContainer/AllReviewContainer';
import AllReviewHeader from './_components/AllReviewHeader/AllReviewHeader';
import { HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import React from 'react';
import Splitter from '@/components/Splitter/Splitter';
import { getStadiumList } from '@/apis/stadium/stadium.api';
import { stadiumQueries } from '@/apis/stadium/stadium.query';
import { createPrefetchedQueryClient } from '@/utils/createPrefetchedQueryClient';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { stadiumId } = await params;
  const { data: stadiumList } = await getStadiumList();

  const stadium = stadiumList.active?.find((s) => s.stadiumId === Number(stadiumId));

  const title = `전체 후기 - [${stadium?.stadiumName}]`;
  const description = 'CON:SEAT에서 구역별 시야를 확인해보세요';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

const AllReviewPage = async ({ params }) => {
  const { stadiumId, seatingId } = await params;
  const { dehydratedState } = await createPrefetchedQueryClient([
    stadiumQueries.features,
    stadiumQueries.obstructions,
  ]);

  return (
    <>
      <AllReviewHeader stadiumId={Number(stadiumId)} seatingId={Number(seatingId)} />

      <Splitter color="sub-gray8" style={{ position: 'sticky', top: '56px' }} />

      <HydrationBoundary state={dehydratedState}>
        <AllReviewContainer stadiumId={Number(stadiumId)} seatingId={Number(seatingId)} />
      </HydrationBoundary>
    </>
  );
};

export default AllReviewPage;
