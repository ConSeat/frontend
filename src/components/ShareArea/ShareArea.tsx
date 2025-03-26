import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './ShareArea.module.scss';
import Image from 'next/image';

interface ShareAreaProp {
  onCopy: () => void;
  onShareKakao: () => void;
  onShareTwitter: () => void;
  onSave: () => void;
  isLogin: boolean;
}

const ShareArea = ({ onCopy, onSave, onShareKakao, onShareTwitter, isLogin }: ShareAreaProp) => {
  return (
    <div className={styles.shareAreaContainer}>
      <div className={styles.shareAreaText}>결과 공유하기</div>
      <div className={styles.buttonContainer}>
        <Button className={styles.linkCopy} onClick={onCopy}>
          <Icon icon="LinkCopy" size={24} />
        </Button>
        <Button className={styles.kakao} onClick={onShareKakao}>
          <Image src="/logo/kakaotalk.svg" width={28} height={28} alt="" />
        </Button>
        <Button className={styles.twitter} onClick={onShareTwitter}>
          <Image src="/logo/X.svg" width={20} height={20} alt="" />
        </Button>
        {isLogin && (
          <Button className={styles.save} onClick={onSave}>
            <Icon icon="Bookmark" color="#E9ECEF" size={24} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ShareArea;
