'use client';

import styles from './EditSection.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { ChangeEventHandler, useRef, useState } from 'react';
import useMutationMember from '@/hooks/mutations/useMutateMember';
import { useFetchMemberInfo } from '@/hooks/queries/useFetchMember';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import { memberKeys } from '@/apis/common/queryKeys';
import type { ImageData } from '@/types/review';

const EditSection = () => {
  const { data } = useFetchMemberInfo();
  const { postMemberMutation } = useMutationMember();
  const [nickName, setNickName] = useState(data?.nickname);
  const [profileImage, setProfileImage] = useState<ImageData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  if (!data || nickName === undefined || !data.profileImage) {
    notFound();
  }

  const handleChangeNickName: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (target.value.length > 20) {
      setNickName(target.value.slice(0, 20));
    } else {
      setNickName(target.value);
    }
  };

  const handleMemberInfoSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const body = {
      nickname: nickName,
      profileImage: profileImage,
    };

    postMemberMutation.mutate(
      { body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: memberKeys.all });
          router.push(`/mypage?tab=view`);
        },
      },
    );
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files === null) return;

    const file = e.target.files[0];

    const newImage: ImageData = {
      file: file,
      previewUrl: URL.createObjectURL(file),
    };

    setProfileImage(newImage);
  };

  return (
    <section className={styles.editSection}>
      <form className={styles.editForm}>
        <div className={styles.userInfo}>
          <div className={styles.profileContainer}>
            <div className={styles.imageContainer}>
              <Image
                src={profileImage !== null ? profileImage.previewUrl : data.profileImage}
                width={80}
                height={80}
                alt="프로필사진"
              />
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
        <Button onClick={handleMemberInfoSubmit}>저장하기</Button>
      </form>
    </section>
  );
};

export default EditSection;
