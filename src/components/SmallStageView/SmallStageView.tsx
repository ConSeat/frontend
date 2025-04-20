'use client';

import ZoomInButton from '../ZoomInButton/ZoomInButton';
import styles from './SmallStageView.module.scss';
import Image from 'next/image';
import useRouterModal from '@/hooks/common/useRouterModal';
import { getStadiumAssetUrl } from '@/utils/getAssetUrl';

interface SmallStageViewProps {
  stadiumId: number;
}

const SmallStageView = ({ stadiumId }: SmallStageViewProps) => {
  const { openModal } = useRouterModal({
    modalPath: `/home/${stadiumId}/review/detail`,
    fallbackPath: `/home/${stadiumId}/review`,
  });

  return (
    <div className={styles.stageContainer}>
      <Image src={getStadiumAssetUrl(stadiumId)} width={79} height={73} alt="" />
      <ZoomInButton onClick={openModal} />
    </div>
  );
};

export default SmallStageView;
