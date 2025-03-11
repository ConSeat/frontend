'use client';

import Button from '../Button/Button';
import styles from './SmallStageView.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ZoomIn } from '@/assets';

interface SmallStageViewProps {
  stadiumId: number;
}

const SmallStageView = ({ stadiumId }: SmallStageViewProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/home/${stadiumId}/review/modal`);
  };

  return (
    <div className={styles.stageContainer}>
      <Image src={`/stadium/${stadiumId}.svg`} width={79} height={73} alt="" />
      <Button
        className={styles.zoomInButton}
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <ZoomIn />
      </Button>
    </div>
  );
};

export default SmallStageView;
