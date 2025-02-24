import Link from 'next/link';

const Hall = async ({ params }) => {
  const { hall } = await params;

  return (
    <div>
      {hall}
      <ul>
        <li>
          <Link href={`/home/${hall}/single`}>{`/home/${hall}/single`}</Link>
        </li>
        <li>
          <Link href={`/home/${hall}/compare`}>{`/home/${hall}/compare`}</Link>
        </li>
        <li>
          <Link href={`/home/${hall}/review`}>{`/home/${hall}/review`}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Hall;
