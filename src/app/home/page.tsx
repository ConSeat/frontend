import { ALL_HALL_NAME } from './constants/hallName';
import Image from 'next/image';
import Link from 'next/link';
import { Pencil, mainLogo } from '@/assets';

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
        <Image src={mainLogo} alt="로고" width={200} height={50} />
        <Pencil width={30} height={30} />
      </div>
      <ul>{hallLinks}</ul>
    </div>
  );
};

export default Home;
