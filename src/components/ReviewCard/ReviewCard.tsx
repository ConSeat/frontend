'use client';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './ReviewCard.module.scss';
import classNames from 'classnames';
import Image from 'next/image';
import type React from 'react';
import type { ReactNode } from 'react';
import useBookMark from '@/hooks/common/useBookmark';
import useLike from '@/hooks/common/useLike';

// Container
interface Container {
  className?: string;
  children?: ReactNode;
}

const Container = ({ className, children }: Container) => {
  return <div className={classNames(styles.reviewCardContainer, className)}>{children}</div>;
};

// Header
interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return <div className={styles.reviewCardHeader}>{children}</div>;
};

// UserInfo (이미지, 닉네임, 시간)
interface BasicInfoProps {
  profileSrc: string;
  userName: string;
  uploadTime: string;
}

const UserInfo = ({ profileSrc, userName, uploadTime }: BasicInfoProps) => {
  return (
    <div className={styles.userInfo}>
      <div className={styles.profile}>
        <Image src={profileSrc} width={38} height={38} alt={'프로필'} />
      </div>
      <div className={styles.textInfo}>
        <div className={styles.userName}>{userName}</div>
        <div className={styles.uploadTime}>{uploadTime}</div>
      </div>
    </div>
  );
};

// ImageItem
interface ImageItem {
  imageSrc: string;
}

const ImageItem = ({ imageSrc }: ImageItem) => {
  const IMAGE_SIZE = 120;

  return (
    <div className={styles.imageBox}>
      <Image width={IMAGE_SIZE} height={IMAGE_SIZE} alt="콘서트 이미지" src={imageSrc} />
    </div>
  );
};

// ImageList
interface ImageListProps {
  imageSrcArray: string[];
}

const ImageList = ({ imageSrcArray }: ImageListProps) => {
  return (
    <div className={styles.reviewImageList}>
      {imageSrcArray.map((src, index) => {
        return <ImageItem key={index + src} imageSrc={src} />;
      })}
    </div>
  );
};

// ConcertTitle
interface ConcertTitleProps {
  concertName: string;
}

const ConcertTitle = ({ concertName }: ConcertTitleProps) => {
  return <div className={styles.concertTitle}>{concertName}</div>;
};

// ConcertDescription
interface ConcertDescriptionProps {
  contents: string;
}

const ConcertDescription = ({ contents }: ConcertDescriptionProps) => {
  return <div className={styles.description}>{contents}</div>;
};

// KeywordItem
interface KeywordItemProps {
  keyword: string;
  isPrimary: boolean;
}

const KeywordItem = ({ keyword, isPrimary }: KeywordItemProps) => {
  return (
    <div className={classNames(styles.keyword, { [styles.primary]: isPrimary })}>{keyword}</div>
  );
};

// KeywordList
interface KeywordListProps {
  keywordArray: string[];
  isPrimary: boolean;
}

const KeywordList = ({ keywordArray, isPrimary }: KeywordListProps) => {
  return (
    <>
      {keywordArray.map((keyword) => {
        return <KeywordItem key={keyword} keyword={keyword} isPrimary={isPrimary} />;
      })}
    </>
  );
};

// Screening
interface ScreeningProps {
  status: '심사대기' | '승인' | '반려' | '재심사';
  rejectReason: string | null;
}

const Screening = ({ status, rejectReason }: ScreeningProps) => {
  return (
    <div className={styles.screeningContainer}>
      <div className={styles.statusWrapper}>
        <Icon icon="Info" size={20} />
        <span className={styles.status}>후기 심사 여부 : {status}</span>
      </div>
      {rejectReason && <span className={styles.reason}>{rejectReason}</span>}
    </div>
  );
};

// Bookmark
interface BookmarkProps {
  reviewId: number;
  isSaved: boolean;
}

const Bookmark = ({ reviewId, isSaved }: BookmarkProps) => {
  const bookMarkColor = isSaved ? '#00FFE5' : undefined;
  const { handleClickBookMark } = useBookMark(isSaved, reviewId);

  return (
    <div className={styles.bookMark}>
      <Icon icon="Bookmark" color={bookMarkColor} onClick={handleClickBookMark} size={24} />
    </div>
  );
};

// LikeButton
interface LikeButtonProps {
  reviewId: number;
  likeNum: number;
  isLiked: boolean;
}

const LikeButton = ({ reviewId, likeNum, isLiked }: LikeButtonProps) => {
  const likeColor = isLiked ? '#00FFE5' : undefined;
  const { handleClickLike } = useLike(isLiked, reviewId);

  return (
    <div className={styles.likeBox}>
      <Button className={styles.likeButton} onClick={handleClickLike}>
        <Icon icon="Like" color={likeColor} />
        <div className={styles.likeText} style={{ color: likeColor }}>
          {likeNum}
        </div>
      </Button>
    </div>
  );
};

const ReviewCard = Object.assign(Container, {
  Header,
  UserInfo,
  ImageList,
  ConcertTitle,
  ConcertDescription,
  KeywordList,
  Screening,
  Bookmark,
  LikeButton,
});

export default ReviewCard;
