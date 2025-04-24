import AllReviewContainer from './_components/AllReviewContainer/AllReviewContainer';
import AllReviewHeader from './_components/AllReviewHeader/AllReviewHeader';
import { HydrationBoundary } from '@tanstack/react-query';
import React from 'react';
import Splitter from '@/components/Splitter/Splitter';
import { seatingReviewQueries } from '@/apis/review/seating.query';
import { createPrefetchedQueryClient } from '@/utils/createPrefetchedQueryClient';

const AllReviewPage = async ({ params }) => {
  const { stadiumId, seatingId } = await params;
  const { dehydratedState } = await createPrefetchedQueryClient([
    seatingReviewQueries.allReviewList(seatingId, {}),
  ]);

  return (
    <>
      <AllReviewHeader />
      <Splitter color="sub-gray8" />
      <HydrationBoundary state={dehydratedState}>
        <AllReviewContainer stadiumId={Number(stadiumId)} seatingId={Number(seatingId)} />
      </HydrationBoundary>
    </>
  );
};

export default AllReviewPage;
