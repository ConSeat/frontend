import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

interface UseModalProps {
  type: 'router' | 'state';
  modalPath?: string;
}

const useModal = ({ type, modalPath = '' }: UseModalProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isModalOpen = type === 'router' ? pathname === modalPath : isOpen;

  const openModal = () => (type === 'router' ? router.push(modalPath!) : setIsOpen(true));

  const closeModal = () => (type === 'router' ? router.back() : setIsOpen(false));

  return { isModalOpen, openModal, closeModal };
};

export default useModal;
