import ReviewContainer from './_components/ReviewContainer';

const ReviewPage = async ({ params }) => {
  const { stadiumId } = await params;

  return <ReviewContainer stadiumId={Number(stadiumId)} />;
};

export default ReviewPage;
