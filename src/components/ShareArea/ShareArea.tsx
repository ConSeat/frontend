import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './ShareArea.module.scss';
import Image from 'next/image';

const ShareArea = () => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었습니다!');
  };

  const handleShareKakao = () => {
    window.Kakao.Share.sendScrap({
      requestUrl: window.location.href,
    });
  };

  const handleShareTwitter = () => {
    window.open(`https://twitter.com/share?url=${window.location.href}`);
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
