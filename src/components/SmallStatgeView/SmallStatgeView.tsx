import Button from '../Button/Button';
import styles from './SmallStatgeView.module.scss';
import Image from 'next/image';
import { ZoomIn } from '@/assets';

interface SmallStatgeViewProps {
  hallName: string;
  onClick: () => void;
}

const SmallStatgeView = ({ hallName, onClick }: SmallStatgeViewProps) => {
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

export default SmallStatgeView;
