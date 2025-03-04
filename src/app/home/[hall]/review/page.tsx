import ReviewContainer from './_components/ReviewContainer';

const ReviewPage = async ({ params }) => {
  const { hall } = await params;

  return (
    <div>
      <ReviewContainer hall={hall} />
    </div>
  );
};

export default ReviewPage;
