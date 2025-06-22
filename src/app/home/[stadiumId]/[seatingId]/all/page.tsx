import AllReviewContainer from './_components/AllReviewContainer/AllReviewContainer';
import AllReviewHeader from './_components/AllReviewHeader/AllReviewHeader';
import { HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import Splitter from '@/components/Splitter/Splitter';
import { getSeatingReviews } from '@/apis/review/seating.api';
import { getStadiumList } from '@/apis/stadium/stadium.api';
import { stadiumQueries } from '@/apis/stadium/stadium.query';
import { createPrefetchedQueryClient } from '@/utils/createPrefetchedQueryClient';
import { fetchOrHandle } from '@/utils/fetchOrHandle';
import { getMetadata } from '@/utils/getMetadata';
import { findStadiumById } from '@/utils/stadium';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { stadiumId, seatingId } = await params;
  const { data: stadiumList } = await getStadiumList();
  const stadium = findStadiumById(stadiumList.active, Number(stadiumId));
  if (!stadium) notFound();

  const title = `${stadium.stadiumName} | 전체 시야 후기`;
  const description = 'CON:SEAT에서 구역별 시야를 확인해보세요';
  const asPath = `/home/${stadiumId}/${seatingId}/all`;

  return getMetadata({ title, description, asPath });
}

const AllReviewPage = async ({ params }) => {
  const { stadiumId, seatingId } = params;

  if (!stadiumId || !seatingId) notFound();

  await fetchOrHandle(() => getSeatingReviews(Number(seatingId)));

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
