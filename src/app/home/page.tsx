import Link from 'next/link';
import Splitter from '@/components/Splitter/Splitter';
import { STADIUM_INFO } from '@/constants/stadium';
import { stadiumDisplayName } from '@/utils/stadium';

const HomePage = () => {
  return (
    <div>
      <ul>
        {STADIUM_INFO.active.map(({ stadiumId }) => (
          <li key={stadiumId}>
            <Link href={`/home/${stadiumId}`}>{stadiumDisplayName(stadiumId)}</Link>
          </li>
        ))}
        <Splitter color="sub-white" />
        {STADIUM_INFO.inactive.map(({ stadiumId }) => (
          <li key={stadiumId}>
            <Link href={`/home/${stadiumId}`}>{stadiumDisplayName(stadiumId)}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
