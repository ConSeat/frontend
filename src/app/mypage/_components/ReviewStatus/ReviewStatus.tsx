import styles from './ReviewStatus.module.scss';
import Icon from '@/components/Icon/Icon';
import Splitter from '@/components/Splitter/Splitter';

interface ReviewStatus {
  status: string;
  description?: string;
}

const ReviewStatus = ({ status, description }: ReviewStatus) => {
  return (
    <>
      <Splitter />
      <div className={styles.statusContainer}>
        <div className={styles.reviewStatus}>
          <Icon icon="Exclamation" />
          <div className={styles.statusText}>후기 승인 여부 : {status}</div>
        </div>
        {description && <div className={styles.description}>• {description}</div>}
      </div>
    </>
  );
};

export default ReviewStatus;
