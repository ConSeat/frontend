import Header from '../_components/Header/Header';
import InfoSection from '../_components/InfoSection';
import styles from './service.module.scss';

const page = () => {
  return (
    <div className={styles.layout}>
      <Header title="앱 설정" />
      <InfoSection />
    </div>
  );
};

export default page;
