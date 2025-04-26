'use client';

import ReviewCollection from '../ReviewCollection';
import UserInfo from '../UserInfo/UserInfo';
import { notFound } from 'next/navigation';
import { useFetchMemberInfo } from '@/hooks/queries/useFetchMember';

const options = ['옵션1', '옵션2', '옵션3'];
const reviews = [
  {
    reviewId: 1,
    imageSrc: '/images/kspo-dome.jpg',
    title: 'KSPO COME',
    seat: '1구역 5~8열',
    status: '반려',
  },
  { reviewId: 2, imageSrc: '/images/kspo-dome.jpg', title: 'KSPO COME', seat: '1구역 5~8열' },
  { reviewId: 3, imageSrc: '/images/kspo-dome.jpg', title: 'KSPO COME', seat: '1구역 5~8열' },
  { reviewId: 4, imageSrc: '/images/kspo-dome.jpg', title: 'KSPO COME', seat: '1구역 5~8열' },
  { reviewId: 5, imageSrc: '/images/kspo-dome.jpg', title: 'KSPO COME', seat: '1구역 5~8열' },
  { reviewId: 6, imageSrc: '/images/kspo-dome.jpg', title: 'KSPO COME', seat: '1구역 5~8열' },
  { reviewId: 7, imageSrc: '/images/kspo-dome.jpg', title: 'KSPO COME', seat: '1구역 5~8열' },
  { reviewId: 8, imageSrc: '/images/kspo-dome.jpg', title: 'KSPO COME', seat: '1구역 5~8열' },
  { reviewId: 9, imageSrc: '/images/kspo-dome.jpg', title: 'KSPO COME', seat: '1구역 5~8열' },
  { reviewId: 10, imageSrc: '/images/kspo-dome.jpg', title: 'KSPO COME', seat: '1구역 5~8열' },
  { reviewId: 11, imageSrc: '/images/kspo-dome.jpg', title: 'KSPO COME', seat: '1구역 5~8열' },
  { reviewId: 12, imageSrc: '/images/kspo-dome.jpg', title: 'KSPO COME', seat: '1구역 5~8열' },
  { reviewId: 13, imageSrc: '/images/kspo-dome.jpg', title: 'KSPO COME', seat: '1구역 5~8열' },
  { reviewId: 14, imageSrc: '/images/kspo-dome.jpg', title: 'KSPO COME', seat: '1구역 5~8열' },
];

const UserInfoContainer = () => {
  const { data } = useFetchMemberInfo();

  if (!data) {
    notFound();
  }

  return (
    <>
      <UserInfo profileImage={data.profileImage} nickname={data.nickname} email={data.email} />
      <ReviewCollection
        viewNumber={data.favoriteCount}
        reviewNumber={data.myReviewCount}
        filterOptions={options}
        reviews={reviews}
      />
    </>
  );
};
export default UserInfoContainer;
