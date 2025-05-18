'use client';

import styles from './StadiumItem.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useToast } from '@/providers/ToastProvider';

interface Props {
  stadiumName: string;
  backgroundImageSrc: string;
  isActive: boolean;
  href: string;
}

export default function StadiumItem({ stadiumName, isActive, backgroundImageSrc, href }: Props) {
  const router = useRouter();
  const { activateToast } = useToast();

  const navigate = () => {
    if (!isActive) {
      activateToast('아직 오픈되지 않은 공연장이에요', 'Info');
      return;
    }
    router.push(href);
  };

  const handlePointerEnter: React.PointerEventHandler<HTMLDivElement> = () => {
    if (isActive) {
      router.prefetch(href);
    }
  };

  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    navigate();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter') {
      navigate();
    }
  };

  return (
    <li
      className={classNames(styles.stadiumItemLayout, {
        [styles.comingSoon]: !isActive,
      })}
    >
      <div
        role="link"
        tabIndex={0}
        className={styles.stadiumItem}
        onPointerEnter={handlePointerEnter}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <Image
          src={backgroundImageSrc}
          alt={`${stadiumName} 커버 사진`}
          fill
          sizes="(max-width: 600px) 100vw, 300px"
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.stadiumName}>{stadiumName}</div>
      </div>
    </li>
  );
}
