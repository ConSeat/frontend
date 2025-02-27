import Link from 'next/link';
import { ALL_HALL_IDS } from '@/constants/hallName';
import { getDisplayName } from '@/utils/hallName';

const HomePage = () => {
  return (
    <div>
      <ul>
        {ALL_HALL_IDS.map((id) => (
          <li key={id}>
            <Link href={`/home/${id}`}>{getDisplayName(id)}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
