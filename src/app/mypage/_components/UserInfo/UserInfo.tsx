import styles from './UserInfo.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';

interface UserInfo {
  thumbnail: string;
  nickName: string;
  email: string;
}

const UserInfo = ({ thumbnail, nickName, email }: UserInfo) => {
  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.profileContainer}>
        <div className={styles.imageContainer}>
          <Image src={thumbnail} width={64} height={64} alt="프로필사진" />
        </div>
        <Link href={'/mypage/settings/account'}>
          <Button className={styles.editButton}>
            <Icon icon="Pencil" size={10} />
          </Button>
        </Link>
      </div>
      <div className={styles.textProfile}>
        <div className={styles.userName}>
          <span className={styles.nickName}>{nickName}</span>님
        </div>
        <div className={styles.email}>{email}</div>
      </div>
    </div>
  );
};

export default UserInfo;
