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
    router.push(`/home/${stadiumId}`);
  };

  return (
    <div className={styles.btnContainer}>
      <Button variant="secondary" onClick={handleSearchRe}>
        <Icon icon="Retry" />
        <div className={styles.retryText}>다시 검색하기</div>
      </Button>
      <Button onClick={handleSearchEnd}>
        <div className={styles.finishText}>검색 종료</div>
      </Button>
    </div>
  );
};

export default SearchEndButton;
