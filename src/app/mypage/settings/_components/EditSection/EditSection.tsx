'use client';

import styles from './EditSection.module.scss';
import Image from 'next/image';
import { ChangeEventHandler, useState } from 'react';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';

interface EditSectionProps {
  profileImage: string;
  nickname: string;
}
const EditSection = ({ nickname, profileImage }: EditSectionProps) => {
  const [nickName, setNickName] = useState(nickname);

  const handleChangeNickName: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (target.value.length > 20) {
      setNickName(target.value.slice(0, 20));
    } else {
      setNickName(target.value);
    }
  };

  return (
    <section className={styles.editSection}>
      <form className={styles.editForm}>
        <div className={styles.userInfo}>
          <div className={styles.profileContainer}>
            <div className={styles.imageContainer}>
              <Image src={profileImage} width={80} height={80} alt="프로필사진" />
            </div>
            <Button className={styles.editButton}>
              <Icon icon="Camera" size={13} />
            </Button>
          </div>
          <div className={styles.nickName}>
            <div className={styles.text}>닉네임</div>
            <input value={nickName} onChange={handleChangeNickName} name="nickname" />
            <div className={styles.textNumber}>{nickName.length}/20</div>
          </div>
        </div>
        <Button type="submit">저장하기</Button>
      </form>
    </section>
  );
};

export default EditSection;
