import StadiumItem from '../StadiumItem';
import styles from './StadiumList.module.scss';
import { STADIUM_INFO } from '@/constants/stadium';

interface StadiumListProps {
  stadiumType: keyof typeof STADIUM_INFO;
}

const StadiumList = ({ stadiumType }: StadiumListProps) => {
  const isActive = stadiumType === 'active';

  return (
    <ul className={styles.stadiumList}>
      {STADIUM_INFO[stadiumType].map(({ stadiumId, image, name }) => (
        <StadiumItem
          key={stadiumId}
          stadiumName={name}
          isActive={isActive}
          backgroundImageSrc={image}
          href={`/home/${stadiumId}`}
        />
      ))}
    </ul>
  );
};

export default StadiumList;
