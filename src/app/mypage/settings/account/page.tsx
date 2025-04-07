import EditSection from '../_components/EditSection';
import Header from '../_components/Header/Header';
import styles from './account.module.scss';

const page = () => {
  return (
    <div className={styles.layout}>
      <Header title="프로필 설정" />
      <EditSection nickname={'부화주콘'} profileImage={'/images/kspo-dome.jpg'} />
    </div>
  );
};

export default page;
