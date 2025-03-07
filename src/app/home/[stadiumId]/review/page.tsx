import ReviewContainer from './_components/ReviewContainer';

const ReviewPage = async ({ params }) => {
  const { stadium } = await params;

  return (
    <div>
      <ReviewContainer stadiumId={Number(stadium)} />
    </div>
  );
};

export default ReviewPage;
