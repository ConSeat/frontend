import ReviewDetailContainer from './_components/ReviewDetailContainer/ReviewDetailContainer';
import ReviewDetailHeader from './_components/ReviewDetailHeader/ReviewDetailHeader';
import React from 'react';
import Splitter from '@/components/Splitter/Splitter';

const SingleDetailPage = async ({ params }) => {
  const { stadiumId, seatingId } = await params;

  return (
    <div>
      <ReviewDetailHeader />
      <Splitter color="sub-gray8" />
      <ReviewDetailContainer stadiumId={stadiumId} seatingId={seatingId} />
    </div>
  );
};

export default SingleDetailPage;
