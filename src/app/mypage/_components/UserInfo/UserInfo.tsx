'use client';

import styles from './UserInfo.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';

interface UserInfoProps {
  profileImage: string;
  nickname: string;
  email: string;
}

const UserInfo = ({ email, nickname, profileImage }: UserInfoProps) => {
  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.profileContainer}>
        <div className={styles.imageContainer}>
          <Image src={profileImage} width={64} height={64} alt="프로필사진" />
        </div>
        <Link href={'/settings/account'}>
          <Button className={styles.editButton}>
            <Icon icon="Pencil" size={10} />
          </Button>
        </Link>
      </div>
      <div className={styles.textProfile}>
        <div className={styles.userName}>
          <span className={styles.nickName}>{nickname}</span>님
        </div>
        <div className={styles.email}>{email}</div>
      </div>
    </div>
  );
};

export default UserInfo;
