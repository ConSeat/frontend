import { ALL_HALL_NAME } from '../constants/hallName';

export async function generateStaticParams() {
  const staticParams = ALL_HALL_NAME.map((value) => {
    return { hall: value };
  });

  return staticParams;
}

export const dynamicParams = false;

const HallLayout = async ({ params, children }) => {
  const { hall } = await params;

  return (
    <div>
      <h1>{hall} Page</h1>
      {children}
    </div>
  );
};

export default HallLayout;
