import { notFound } from 'next/navigation';
import hallNameMap from '@/utils/consts/allowrdHallNames';

export async function generateStaticParams() {
  const staticParams = Object.values(hallNameMap).map((value) => {
    return { hall: value };
  });

  return staticParams;
}

const HallLayout = async ({ params, children }) => {
  const { hall } = await params;

  if (!Object.values(hallNameMap).includes(hall)) {
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
