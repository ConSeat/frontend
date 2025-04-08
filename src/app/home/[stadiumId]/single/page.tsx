import SingleFunnel from './_components/SingleFunnel/SingleFunnel';

const SinglePage = async ({ params }) => {
  const { stadiumId } = await params;

  return <SingleFunnel stadiumId={Number(stadiumId)} />;
};

export default SinglePage;
