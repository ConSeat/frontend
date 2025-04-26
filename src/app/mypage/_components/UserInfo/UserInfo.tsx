'use client';

import styles from './UserInfo.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useFetchMemberInfo } from '@/hooks/queries/useFetchMember';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';

const UserInfo = () => {
  const { data } = useFetchMemberInfo();

  if (!data) {
    notFound();
  }

  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.profileContainer}>
        <div className={styles.imageContainer}>
          <Image src={data.profileImage} width={64} height={64} alt="프로필사진" />
        </div>
        <Link href={'/mypage/settings/account'}>
          <Button className={styles.editButton}>
            <Icon icon="Pencil" size={10} />
          </Button>
        </Link>
      </div>
      <div className={styles.textProfile}>
        <div className={styles.userName}>
          <span className={styles.nickName}>{data.nickname}</span>님
        </div>
        <div className={styles.email}>{data.email}</div>
      </div>
    </div>
  );
};

export default UserInfo;
