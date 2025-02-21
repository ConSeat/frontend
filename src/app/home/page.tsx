import Image from 'next/image';
import Link from 'next/link';
import { Pencil, mainLogo } from '@/assets';

const Home = () => {
  const hallName = 'olim';
  return (
    <div>
      <div style={{ width: '500px', height: '500px', backgroundColor: 'black' }}>
        <Image src={mainLogo} alt="로고" width={200} height={50} />
        <Pencil width={30} height={30} />
      </div>
      <ul>
        <li>
          <Link href={`/home/${hallName}`}>{`home/${hallName}`}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
