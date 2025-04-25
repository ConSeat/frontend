import AccountHeader from './_components/AccountHeader/AccountHeader';
import EditSection from './_components/EditSection';
import styles from './account.module.scss';

const Page = () => {
  return (
    <div className={styles.layout}>
      <AccountHeader />
      <EditSection nickname={'부화주콘'} profileImage={'/images/kspo-dome.jpg'} />
    </div>
  );
};

export default Page;
