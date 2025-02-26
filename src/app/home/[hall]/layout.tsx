import styles from './page.module.scss';
import Header from '@/components/Header/Header';

const Layout = ({ children, params }: { children: React.ReactNode; params: { hall: string } }) => {
  return (
    <div className={styles.layout}>
      <Header hall={params.hall} />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
