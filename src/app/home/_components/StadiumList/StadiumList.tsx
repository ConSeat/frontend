import StadiumItem from '../StadiumItem';
import styles from './StadiumList.module.scss';
import { STADIUM_INFO } from '@/constants/stadium';
import type { StadiumInfo } from '@/types/stadium';

interface StadiumListProps {
  stadiumType: keyof typeof STADIUM_INFO;
  data?: StadiumInfo[];
}

const StadiumList = ({ stadiumType, data }: StadiumListProps) => {
  const isActive = stadiumType === 'active';

  return (
    <ul className={styles.stadiumList}>
      {data?.map(({ stadiumId, stadiumName, stadiumImage }) => (
        <StadiumItem
          key={stadiumId}
          stadiumName={stadiumName}
          isActive={isActive}
          backgroundImageSrc={stadiumImage}
          href={`/home/${stadiumId}`}
        />
      ))}
    </ul>
  );
};

export default StadiumList;
