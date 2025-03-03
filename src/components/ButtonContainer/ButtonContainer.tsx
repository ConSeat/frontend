import styles from './ButtonContainer.module.scss';
import { ReactNode } from 'react';

interface FooterProps {
  children: ReactNode;
}

const ButtonContainer = ({ children }: FooterProps) => {
  return <div className={styles.footer}>{children}</div>;
};

export default ButtonContainer;
