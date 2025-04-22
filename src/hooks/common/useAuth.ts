import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePopup } from '@/providers/PopupProvider';
import { requireLogin } from '@/utils/requireLogin';

export const useAuth = () => {
  const { showPopup } = usePopup();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const checkAndExecute = async (action: () => void, popupText: string) => {
    if (!isClient) return;

    try {
      await requireLogin(action);
    } catch (error) {
      if (error instanceof Error && error.message === 'LoginRequired') {
        showPopup({
          title: '로그인 필요',
          subtitle: popupText,
          onConfirm: () => {
            sessionStorage.setItem('returnUrl', window.location.href);
            router.push('/signin');
          },
        });
      }
    }
  };

  return { checkAndExecute };
};
