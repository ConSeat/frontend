import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePopup } from '@/providers/PopupProvider';

export const useAuth = () => {
  const { showPopup } = usePopup();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { data: session, status } = useSession();
  const isLogin = status === 'authenticated' && !!session?.user;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const checkAndExecute = async (action: () => void, popupText: string) => {
    if (!isClient) return;

    if (isLogin) {
      action();
    } else {
      showPopup({
        title: '로그인이 필요합니다',
        subtitle: popupText,
        confirmText: '로그인',
        cancelText: '취소',
        onConfirm: () => {
          sessionStorage.setItem('returnUrl', window.location.href);
          router.push('/signin');
        },
      });
    }
  };

  return { checkAndExecute };
};
