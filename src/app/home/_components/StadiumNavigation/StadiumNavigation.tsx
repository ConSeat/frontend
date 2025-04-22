import StadiumList from '../StadiumList';
import styles from './StadiumNavigation.module.scss';
import classNames from 'classnames';
import type { StadiumInfo, StadiumType } from '@/types/stadium';

interface StadiumNavigationProps {
  navigationType: StadiumType;
  data?: StadiumInfo[];
}

const StadiumNavigation = ({ navigationType, data }: StadiumNavigationProps) => {
  const navTitle = {
    active: '공연장',
    inactive: '오픈예정',
  };

  return (
    <nav
      className={classNames(styles.stadiumNav, {
        [styles.inactive]: navigationType === 'inactive',
      })}
    >
      <h3 className={styles.subtitle}>{navTitle[navigationType]}</h3>
      <StadiumList stadiumType={navigationType} data={data} />
    </nav>
  );
};

export default StadiumNavigation;
