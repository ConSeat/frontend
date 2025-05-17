import AllReviewContainer from './_components/AllReviewContainer/AllReviewContainer';
import AllReviewHeader from './_components/AllReviewHeader/AllReviewHeader';
import { HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import React from 'react';
import Splitter from '@/components/Splitter/Splitter';
import { getSeatingReviews } from '@/apis/review/seating.api';
import { getStadiumList } from '@/apis/stadium/stadium.api';
import { stadiumQueries } from '@/apis/stadium/stadium.query';
import type { StadiumInfo } from '@/types/stadium';
import { createPrefetchedQueryClient } from '@/utils/createPrefetchedQueryClient';

type Props = {
  params: { stadiumId: string; seatingId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stadiumId, seatingId } = params;
  const { data: stadiumData } = await getStadiumList();
  const data = await getSeatingReviews(Number(seatingId));

  const stadium = stadiumData.active?.find((s: StadiumInfo) => s.stadiumId === Number(stadiumId));

  const title =
    `${stadium?.stadiumName}` +
    `${data.floorName} ${data.sectionName}` +
    (data.seatingName ? ` ${data.seatingName}` : '');
  const description = '구역별 콘서트 시야를 확인해보세요';

  return { title, description };
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
