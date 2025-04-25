import StadiumItem from '../StadiumItem';
import styles from './StadiumList.module.scss';
import type { StadiumInfo, StadiumType } from '@/types/stadium';

interface StadiumListProps {
  stadiumType: StadiumType;
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
