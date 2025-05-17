import AllReviewContainer from './_components/AllReviewContainer/AllReviewContainer';
import AllReviewHeader from './_components/AllReviewHeader/AllReviewHeader';
import { HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import React from 'react';
import Splitter from '@/components/Splitter/Splitter';
import { getSeatingReviews } from '@/apis/review/seating.api';
import { getStadiumList } from '@/apis/stadium/stadium.api';
import { stadiumQueries } from '@/apis/stadium/stadium.query';
import { createPrefetchedQueryClient } from '@/utils/createPrefetchedQueryClient';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { stadiumId, seatingId } = await params;
  const { data: stadiumList } = await getStadiumList();
  const seatInfo = await getSeatingReviews(Number(seatingId));

  const stadium = stadiumList.active?.find((s) => s.stadiumId === Number(stadiumId));
  const areaLabel = [
    stadium?.stadiumName,
    seatInfo.floorName,
    seatInfo.sectionName,
    seatInfo.seatingName,
  ]
    .filter(Boolean)
    .join(' ');

  const title = `CON:SEAT - ${areaLabel} 시야`;
  const description = '구역별 콘서트 시야를 확인해보세요';

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
