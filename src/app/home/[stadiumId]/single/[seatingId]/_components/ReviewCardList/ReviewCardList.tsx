import React from 'react';
import ReviewCard from '@/components/ReviewCard';
import { SeatingReview } from '@/types/review';

interface ReviewCardListProps {
  reviews: SeatingReview[];
}

const ReviewCardList = ({ reviews }: ReviewCardListProps) => {
  return (
    <div>
      <div>
        <div>상세후기 {reviews.length}</div>
        <div>더보기 {'>'}</div>
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
            likeNumber,
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
                likeNumber={likeNumber}
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
