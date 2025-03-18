import styles from './StadiumItem.module.scss';
import classNames from 'classnames';
import Link from 'next/link';

interface StadiumItemProps {
  stadiumName: string;
  backgroundImageSrc: string;
  isActive: boolean;
  href: string;
}

const StadiumItem = ({ stadiumName, isActive, backgroundImageSrc, href }: StadiumItemProps) => {
  return (
    <li
      style={{ backgroundImage: `url('${backgroundImageSrc}')` }}
      className={classNames(styles.stadiumItemLayout, {
        [styles.open]: isActive,
        [styles.comingsoon]: !isActive,
      })}
    >
      <Link href={href} className={styles.stadiumItem}>
        <div className={styles.stadiumName}>{stadiumName}</div>
      </Link>
    </li>
  );
};

export default StadiumItem;
