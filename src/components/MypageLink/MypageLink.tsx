import Icon from '../Icon/Icon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useEffect, useState } from 'react';
import { MY_PAGE_QUERY, VIEW_TAP } from '@/constants/myPage';
import { isLoggedIn } from '@/utils/requireLogin';

const MypageLink = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const result = await isLoggedIn();
      setIsLogin(result);
    };
    checkLogin();
  }, []);

  const handleClickLink: MouseEventHandler = (e) => {
    e.preventDefault();

    if (!isLogin) {
      sessionStorage.setItem('returnUrl', window.location.href);
    }

    const nextHref = isLogin ? `/mypage?${MY_PAGE_QUERY}=${VIEW_TAP}` : `/signin`;
    router.push(nextHref);
  };

  return (
    <Link
      href={isLogin ? `/mypage?${MY_PAGE_QUERY}=${VIEW_TAP}` : `/signin`}
      onClick={handleClickLink}
    >
      <Icon icon="DefaultProfile" />
    </Link>
  );
};

export default MypageLink;
