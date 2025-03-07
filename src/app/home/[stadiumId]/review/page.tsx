import ReviewContainer from './_components/ReviewContainer';

const ReviewPage = async ({ params }) => {
  const { stadiumId } = await params;

  return (
    <div>
      <ReviewContainer stadiumId={Number(stadiumId)} />
    </div>
  );
};

export default ReviewPage;
