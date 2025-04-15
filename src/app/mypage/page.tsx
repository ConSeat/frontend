import styles from './MyPage.module.scss';
import Header from './_components/Header/Header';
import ReviewCollection from './_components/ReviewCollection/ReviewCollection';
import UserInfo from './_components/UserInfo';

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

const MyPage = () => {
  return (
    <div className={styles.pageLayout}>
      <Header />
      <div className={styles.userInfoArea}>
        <UserInfo
          thumbnail="/images/jamsil-arena.jpg"
          nickName="부희주콘"
          email="j7papa@naver.com"
        />
        <ReviewCollection
          viewNumber={0}
          reviewNumber={4}
          filterOptions={options}
          reviews={reviews}
        />
      </div>
    </div>
  );
};

export default MyPage;
