import AllReviewContainer from './_components/AllReviewContainer/AllReviewContainer';
import AllReviewHeader from './_components/AllReviewHeader/AllReviewHeader';
import React from 'react';
import Splitter from '@/components/Splitter/Splitter';

const AllReviewPage = async ({ params }) => {
  const { stadiumId, seatingId } = await params;

  return (
    <div>
      <AllReviewHeader />
      <Splitter color="sub-gray8" />
      <AllReviewContainer stadiumId={stadiumId} seatingId={seatingId} />
    </div>
  );
};

export default AllReviewPage;
