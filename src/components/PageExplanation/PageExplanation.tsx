import styles from './PageExplanation.module.scss';
import { ReactNode } from 'react';

const PageExplanation = ({ children }: { children: ReactNode }) => {
  return <section className={styles.pageExplanation}>{children}</section>;
};

const Title = ({ children }: { children: ReactNode }) => {
  return <h2 className={styles.pageTitle}>{children}</h2>;
};

const Subtitle = ({ children }: { children: ReactNode }) => {
  return <div className={styles.explanation}>{children}</div>;
};

PageExplanation.Title = Title;
PageExplanation.Subtitle = Subtitle;

export default PageExplanation;
