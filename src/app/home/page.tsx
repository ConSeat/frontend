import { ALL_HALL_NAME } from './constants/hallName';
import Link from 'next/link';
import { Pencil } from '@/assets';

const Home = () => {
  const hallLinks = ALL_HALL_NAME.map((name) => {
    return (
      <li key={name}>
        <Link href={`/home/${name}`}>{`home/${name}`}</Link>
      </li>
    );
  });

  return (
    <div>
      <div style={{ width: '500px', height: '500px', backgroundColor: 'black' }}>
        <Pencil width={30} height={30} />
      </div>
      <ul>{hallLinks}</ul>
    </div>
  );
};

export default Home;
