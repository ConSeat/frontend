import InfoSection from './_components/InfoSection';
import ServiceHeader from './_components/ServiceHeader/ServiceHeader';
import styles from './service.module.scss';

const Page = () => {
  return (
    <div className={styles.layout}>
      <ServiceHeader />
      <InfoSection />
    </div>
  );
};

export default Page;
