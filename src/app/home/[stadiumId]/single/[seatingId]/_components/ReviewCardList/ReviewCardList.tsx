import styles from './ReviewCardList.module.scss';
import Button from '@/components/Button/Button';
import ReviewCard from '@/components/ReviewCard';
import { SeatingReview } from '@/types/review';

interface ReviewCardListProps {
  reviews: SeatingReview[];
}

const ReviewCardList = ({ reviews }: ReviewCardListProps) => {
  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewsHeader}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>상세후기</div>
          <div className={styles.reviewNumber}>{reviews.length}</div>
        </div>
        <Button className={styles.moreButton}>더보기 {'>'}</Button>
      </div>
      <div>
        {reviews.map(
          ({
            reviewId,
            concertName,
            contents,
            createdAt,
            features,
            images,
            isBookmarked,
            isLiked,
            likesCount,
            obstructions,
            writerNickname,
            writerSrc,
          }) => {
            return (
              <ReviewCard
                key={reviewId}
                images={images}
                features={features}
                obstructions={obstructions}
                concertName={concertName}
                contents={contents}
                writerSrc={writerSrc}
                createdAt={createdAt}
                writerNickname={writerNickname}
                likesCount={likesCount}
                isBookmarked={isBookmarked}
                isLiked={isLiked}
                handleClickMore={() => {}}
                handleClickLike={() => {}}
                handleClickBookmark={() => {}}
              />
            );
          },
        )}
      </div>
    </div>
  );
};

export default ReviewCardList;
