import { ALL_HALL_NAME } from '../constants/hallName';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const staticParams = ALL_HALL_NAME.map((value) => {
    return { hall: value };
  });

  return staticParams;
}

const HallLayout = async ({ params, children }) => {
  const { hall } = await params;

  if (!Object.values(ALL_HALL_NAME).includes(hall)) {
    notFound();
  }

  return (
    <div>
      <h1>{hall} Page</h1>
      {children}
    </div>
  );
};

export default HallLayout;
