import { usePathname, useRouter } from 'next/navigation';

interface UseRouterModalProps {
  modalPath: string;
  fallbackPath: string;
}

const useRouterModal = ({ modalPath, fallbackPath }: UseRouterModalProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isModalOpen = pathname === modalPath;

  const openModal = () => router.push(modalPath);

  const closeModal = () => {
    if (window.history.length > 2) {
      router.back();
      return;
    }
    router.push(fallbackPath); // url로 바로 접근했을 때 모달 닫은 페이지로 이동
  };

  return { isModalOpen, openModal, closeModal };
};

export default useRouterModal;
