import Icon from '../Icon/Icon';
import styles from './Background.module.scss';

const SecondBackground = () => {
  return (
    <div className={styles.wrapper}>
      <Icon icon="HomeC" className={styles.secondC} />
      <Icon icon="LargeO" className={styles.secondO} />
    </div>
  );
};

export default SecondBackground;
