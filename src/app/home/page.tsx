import Link from 'next/link';

const Home = () => {
  const hallName = 'olim';
  return (
    <div>
      <ul>
        <li>
          <Link href={`/home/${hallName}`}>{`home/${hallName}`}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
