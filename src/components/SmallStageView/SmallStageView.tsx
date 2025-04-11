'use client';

import ZoomInButton from '../ZoomInButton/ZoomInButton';
import styles from './SmallStageView.module.scss';
import Image from 'next/image';
import useModal from '@/hooks/useModal';

interface SmallStageViewProps {
  stadiumId: number;
}

const SmallStageView = ({ stadiumId }: SmallStageViewProps) => {
  const { openModal } = useModal({ type: 'router', modalPath: `/home/${stadiumId}/review/detail` });

  return (
    <div className={styles.stageContainer}>
      <Image src={`/stadium/${stadiumId}.svg`} width={79} height={73} alt="" />
      <ZoomInButton onClick={openModal} />
    </div>
  );
};

export default SmallStageView;
