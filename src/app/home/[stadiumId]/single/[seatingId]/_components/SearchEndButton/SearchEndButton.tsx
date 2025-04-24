'use client';

import styles from './SearchEndButton.module.scss';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';

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
        다시 검색하기
      </Button>
      <Button onClick={handleSearchEnd}>검색 종료</Button>
    </div>
  );
};

export default SearchEndButton;
