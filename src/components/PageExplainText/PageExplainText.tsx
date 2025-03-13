import styles from './PageExplainText.module.scss';
import { ReactNode } from 'react';

const PageExplainText = ({ children }: { children: ReactNode }) => {
  return <h2 className={styles.pageTitle}>{children}</h2>;
};

export default PageExplainText;
