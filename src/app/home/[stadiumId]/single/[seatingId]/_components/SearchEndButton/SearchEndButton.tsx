'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import ButtonContainer from '@/components/ButtonContainer/ButtonContainer';
import { usePopup } from '@/providers/PopupProvider';

interface SearchEndButtonProps {
  stadiumId: number;
}
const SearchEndButton = ({ stadiumId }: SearchEndButtonProps) => {
  const router = useRouter();
  const { showPopup } = usePopup();

  const handleClickConfirm = () => {
    router.push(`/home/${stadiumId}`);
  };

  return (
    <ButtonContainer>
      <Button
        onClick={() =>
          showPopup({
            onConfirm: handleClickConfirm,
            title: '검색을 종료하시겠어요?',
            subtitle: '자리 검색을 종료하고 싶다면, 종료버튼을 눌러주세요',
            cancelText: '다시 검색하기',
            confirmText: '종료',
          })
        }
      >
        검색 완료
      </Button>
    </ButtonContainer>
  );
};

export default SearchEndButton;
