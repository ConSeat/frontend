'use client';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './ReviewCard.module.scss';
import classNames from 'classnames';
import Image from 'next/image';

interface HeaderProps {
  profileSrc: string;
  userName: string;
  uploadTime: string;
  isSaved: boolean;
  onClick: () => void;
}

const Header = ({ profileSrc, uploadTime, userName, isSaved, onClick }: HeaderProps) => {
  const bookMarkColor = isSaved ? '#00FFE5' : undefined;

  return (
    <div className={styles.reviewCardHeader}>
      <div className={styles.userInfo}>
        <div className={styles.profile}>
          <Image src={profileSrc} width={38} height={38} alt={'프로필'} />
        </div>
        <div className={styles.textInfo}>
          <div className={styles.userName}>{userName}</div>
          <div className={styles.uploadTime}>{uploadTime}</div>
        </div>
      </div>
      <div className={styles.bookMark}>
        <Button className={styles.bookMarkButton} onClick={onClick}>
          <Icon icon="Bookmark" color={bookMarkColor} />
        </Button>
      </div>
    </div>
  );
};

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

const KeywordItem = ({ keyword, isPrimary }: { keyword: string; isPrimary: boolean }) => {
  return (
    <div className={classNames(styles.keyword, { [styles.primary]: isPrimary })}>{keyword}</div>
  );
};

interface KeywordList {
  keywordArray: string[];
  isPrimary: boolean;
}

const KeywordList = ({ keywordArray, isPrimary }: KeywordList) => {
  return (
    <>
      {keywordArray.map((keyword) => {
        return <KeywordItem key={keyword} keyword={keyword} isPrimary={isPrimary} />;
      })}
    </>
  );
};

interface FooterProps {
  likeNum: number;
  isLiked: boolean;
  onClickLike: () => void;
  onClickMore: () => void;
}

const Footer = ({ likeNum, isLiked, onClickLike, onClickMore }: FooterProps) => {
  const likeColor = isLiked ? '#00FFE5' : undefined;

  return (
    <div className={styles.reviewCardFooter}>
      <div className={styles.likeBox}>
        <Button className={styles.likeButton} onClick={onClickLike}>
          <Icon icon="Like" color={likeColor} />
          <div className={styles.likeText} style={{ color: likeColor }}>
            {likeNum}
          </div>
        </Button>
      </div>
      <div className={styles.more}>
        <Button className={styles.moreButton} onClick={onClickMore}>
          <Icon icon="MoreFunction" />
        </Button>
      </div>
    </div>
  );
};

interface ReviewCardProps {
  imageSrcArray: string[];
  features: string[];
  obstructions: string[];
  concertName: string;
  reviewDescription: string;
  profileSrc: string;
  uploadTime: string;
  userName: string;
  likeNumber: number;
  isSaved: boolean;
  isLiked: boolean;
  handleClickMore: () => void;
  handleClickLike: () => void;
  handleClickBookmark: () => void;
}

const ReviewCard = ({
  imageSrcArray,
  features,
  obstructions,
  concertName,
  reviewDescription,
  profileSrc,
  uploadTime,
  userName,
  likeNumber,
  isSaved,
  isLiked,
  handleClickMore,
  handleClickLike,
  handleClickBookmark,
}: ReviewCardProps) => {
  return (
    <div className={styles.reviewCardLayout}>
      <Header
        onClick={handleClickBookmark}
        profileSrc={profileSrc}
        uploadTime={uploadTime}
        userName={userName}
        isSaved={isSaved}
      />
      <ImageList imageSrcArray={imageSrcArray} />
      <div className={styles.concertTitle}>{concertName}</div>
      <div className={styles.description}>{reviewDescription}</div>
      <div className={styles.reviewKeywordList}>
        <KeywordList keywordArray={features} isPrimary={true} />
        <KeywordList keywordArray={obstructions} isPrimary={false} />
      </div>
      <Footer
        likeNum={likeNumber}
        isLiked={isLiked}
        onClickLike={handleClickLike}
        onClickMore={handleClickMore}
      />
    </div>
  );
};

export default ReviewCard;
