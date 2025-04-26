'use client';

import styles from './EditSection.module.scss';
import Image from 'next/image';
import { ChangeEventHandler, useRef, useState } from 'react';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';

interface EditSectionProps {
  profileImage: string;
  nickname: string;
}

const EditSection = ({ nickname, profileImage }: EditSectionProps) => {
  const [nickName, setNickName] = useState(nickname);
  const [profileImageSrc, setProfileImageSrc] = useState(profileImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangeNickName: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (target.value.length > 20) {
      setNickName(target.value.slice(0, 20));
    } else {
      setNickName(target.value);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files === null) return;

    const file = e.target.files[0];
    const newImage = {
      file,
      previewUrl: URL.createObjectURL(file),
    };

    setProfileImageSrc(newImage.previewUrl);
  };

  return (
    <section className={styles.editSection}>
      <form className={styles.editForm}>
        <div className={styles.userInfo}>
          <div className={styles.profileContainer}>
            <div className={styles.imageContainer}>
              <Image src={profileImageSrc} width={80} height={80} alt="프로필사진" />
            </div>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <Button className={styles.editButton} onClick={handleButtonClick} type="button">
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
