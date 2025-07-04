'use client';

import styles from './SearchEndButton.module.scss';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';

interface SearchEndButtonProps {
  stadiumId: number;
}
const SearchEndButton = ({ stadiumId }: SearchEndButtonProps) => {
  const router = useRouter();

  const handleSearchEnd = () => {
    router.push(`/home`);
  };

  const handleSearchRe = () => {
    router.push(`/home/${stadiumId}/single`);
  };

  return (
    <div className={styles.btnContainer}>
      <Button onClick={handleSearchEnd} className={styles.finishButton}>
        <div className={styles.finishText}>종료</div>
      </Button>
      <Button onClick={handleSearchRe} className={styles.retryButton}>
        <Icon icon="Retry" color="black" />
        <span className={styles.retryText}>재검색</span>
      </Button>
    </div>
  );
};

export default SearchEndButton;
