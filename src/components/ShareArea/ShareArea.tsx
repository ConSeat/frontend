'use client';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './ShareArea.module.scss';
import Image from 'next/image';
import { useToast } from '@/providers/ToastProvider';

interface ShareAreaProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

const ShareArea = ({ title, description, imageUrl, url }: ShareAreaProps) => {
  const { activateToast } = useToast();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    activateToast('링크를 복사했어요!', 'LinkCopy');
  };

  const handleShareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${title}\n${description}\n`);
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`,
      '_blank',
    );
  };

  return (
    <div className={styles.shareAreaContainer}>
      <div className={styles.shareAreaText}>결과 공유하기</div>
      <div className={styles.buttonContainer}>
        <Button className={styles.linkCopy} onClick={handleCopyLink}>
          <Icon icon="LinkCopy" size={24} />
        </Button>
        <Button className={styles.kakao} onClick={handleShareKakao}>
          <Image src="/logo/kakaotalk.svg" width={28} height={28} alt="" />
        </Button>
        <Button className={styles.twitter} onClick={handleShareTwitter}>
          <Image src="/logo/X.svg" width={20} height={20} alt="" />
        </Button>
      </div>
    </div>
  );
};

export default ShareArea;
