import styles from './StadiumItem.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
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
      className={classNames(styles.stadiumItemLayout, {
        [styles.comingSoon]: !isActive,
      })}
    >
      <Link
        prefetch={isActive}
        href={href}
        className={styles.stadiumItem}
        onClick={handleClickInactive}
      >
        <Image
          src={backgroundImageSrc}
          alt={stadiumName + '커버 사진'}
          fill
          priority
          sizes="(max-width: 600px) 100vw, 300px"
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.stadiumName}>{stadiumName}</div>
      </Link>
    </li>
  );
};

export default StadiumItem;
