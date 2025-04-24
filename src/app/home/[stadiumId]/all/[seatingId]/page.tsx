import ReviewDetailContainer from './_components/AllReviewContainer/AllReviewContainer';
import AllReviewHeader from './_components/AllReviewHeader/AllReviewHeader';
import React from 'react';
import Splitter from '@/components/Splitter/Splitter';

const SingleDetailPage = async ({ params }) => {
  const { stadiumId, seatingId } = await params;

  return (
    <div>
      <AllReviewHeader />
      <Splitter color="sub-gray8" />
      <ReviewDetailContainer stadiumId={stadiumId} seatingId={seatingId} />
    </div>
  );
};

export default SingleDetailPage;
