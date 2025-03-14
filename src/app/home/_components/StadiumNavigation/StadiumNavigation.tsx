import StadiumList from '../StadiumList';
import styles from './StadiumNavigation.module.scss';
import classNames from 'classnames';
import { STADIUM_INFO } from '@/constants/stadium';

interface StadiumNavigationProps {
  navigationType: keyof typeof STADIUM_INFO;
}

const StadiumNavigation = ({ navigationType }: StadiumNavigationProps) => {
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
      <StadiumList stadiumType={navigationType} />
    </nav>
  );
};

export default StadiumNavigation;
