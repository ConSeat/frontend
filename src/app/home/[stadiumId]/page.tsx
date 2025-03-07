import Link from 'next/link';

const StadiumPage = async ({ params }) => {
  const { stadiumId } = await params;

  return (
    <div>
      <ul>
        <li>
          <Link href={`/home/${stadiumId}/single`}>{`/home/${stadiumId}/single`}</Link>
        </li>
        <li>
          <Link href={`/home/${stadiumId}/compare`}>{`/home/${stadiumId}/compare`}</Link>
        </li>
        <li>
          <Link href={`/home/${stadiumId}/review`}>{`/home/${stadiumId}/review`}</Link>
        </li>
      </ul>
    </div>
  );
};

export default StadiumPage;
