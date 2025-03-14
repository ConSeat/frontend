import { useRouter } from 'next/navigation';

const useModal = () => {
  const router = useRouter();

  const handleOpenModal = (path: string) => {
    router.push(path);
  };

  const handleCloseModal = () => {
    router.back();
  };

  return { handleOpenModal, handleCloseModal };
};

export default useModal;
