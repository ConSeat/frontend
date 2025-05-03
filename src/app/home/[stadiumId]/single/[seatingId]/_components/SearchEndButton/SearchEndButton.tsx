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
      <Button onClick={handleSearchEnd}>
        <div className={styles.finishText}>검색 종료</div>
      </Button>
      <Button variant="secondary" onClick={handleSearchRe} style={{ width: '72px' }}>
        <Icon icon="Retry" />
      </Button>
    </div>
  );
};

export default SearchEndButton;
