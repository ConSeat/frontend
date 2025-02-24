import Link from 'next/link';
import hallNameMap from '@/utils/consts/allowrdHallNames';

interface Hall {
  hall: string;
}

export async function generateStaticParams(): Promise<Hall[]> {
  const staticParams = Object.values(hallNameMap).map((value) => {
    return { hall: value };
  });

  return staticParams;
}

const Hall = ({ params }) => {
  return (
    <div>
      {params.hall}
      <ul>
        <li>
          <Link href={`/home/${params.hall}/single`}>{`/home/${params.hall}/single`}</Link>
        </li>
        <li>
          <Link href={`/home/${params.hall}/compare`}>{`/home/${params.hall}/compare`}</Link>
        </li>
        <li>
          <Link href={`/home/${params.hall}/review`}>{`/home/${params.hall}/review`}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Hall;
