'use client';

import Button from '../Button/Button';
import styles from './SmallStageView.module.scss';
import Image from 'next/image';
import useModal from '@/hooks/useModal';
import { ZoomIn } from '@/assets';

interface SmallStageViewProps {
  stadiumId: number;
}

const SmallStageView = ({ stadiumId }: SmallStageViewProps) => {
  const { openModal } = useModal({ type: 'router', modalPath: `/home/${stadiumId}/review/detail` });

  return (
    <div className={styles.stageContainer}>
      <Image src={`/stadium/${stadiumId}.svg`} width={79} height={73} alt="" />
      <Button
        className={styles.zoomInButton}
        onClick={(e) => {
          e.preventDefault();
          openModal();
        }}
      >
        <ZoomIn />
      </Button>
    </div>
  );
};

export default SmallStageView;
