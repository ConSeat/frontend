'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import ButtonContainer from '@/components/ButtonContainer/ButtonContainer';

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
    <ButtonContainer>
      <Button variant="secondary" onClick={handleSearchEnd}>
        검색 종료
      </Button>
      <Button onClick={handleSearchRe}>다시 검색하기</Button>
    </ButtonContainer>
  );
};

export default SearchEndButton;
