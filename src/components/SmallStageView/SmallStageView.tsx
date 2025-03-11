import Button from '../Button/Button';
import styles from './SmallStageView.module.scss';
import Image from 'next/image';
import { ZoomIn } from '@/assets';

interface SmallStageViewProps {
  hallName: string;
  onClick: () => void;
}

const SmallStageView = ({ hallName, onClick }: SmallStageViewProps) => {
  return (
    <div className={styles.stageContainer}>
      <Image src={`/seats/${hallName}.svg`} width={79} height={72.875} alt="" />
      <Button
        className={styles.zoomInButton}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <ZoomIn />
      </Button>
    </div>
  );
};

export default SmallStageView;
