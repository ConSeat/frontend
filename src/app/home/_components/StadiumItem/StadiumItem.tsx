import styles from './StadiumItem.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import { MouseEventHandler } from 'react';
import { useToast } from '@/providers/ToastProvider';

interface StadiumItemProps {
  stadiumName: string;
  backgroundImageSrc: string;
  isActive: boolean;
  href: string;
}

const StadiumItem = ({ stadiumName, isActive, backgroundImageSrc, href }: StadiumItemProps) => {
  const { activateToast } = useToast();

  const handleClickInactive: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!isActive) {
      e.preventDefault();
      activateToast('아직 오픈되지 않은 공연장이에요', 'Info');
    }
  };

  return (
    <li
      style={{ backgroundImage: `url('${backgroundImageSrc}')` }}
      className={classNames(styles.stadiumItemLayout, {
        [styles.comingSoon]: !isActive,
      })}
    >
      <Link href={href} className={styles.stadiumItem} onClick={handleClickInactive}>
        <div className={styles.stadiumName}>{stadiumName}</div>
      </Link>
    </li>
  );
};

export default StadiumItem;
