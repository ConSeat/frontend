import styles from './MyPage.module.scss';
import Icon from '@/components/Icon/Icon';

const layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      {children}
      <Icon icon="LargeO" className={styles.alphaIcon} />
    </div>
  );
};

export default layout;
