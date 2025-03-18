import SelectMenu from './_components/SelectMenu/SelectMenu';

const StadiumPage = async ({ params }) => {
  const { stadiumId } = await params;

  return <SelectMenu stadiumId={stadiumId} />;
};

export default StadiumPage;
