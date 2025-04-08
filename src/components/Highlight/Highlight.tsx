import styles from './Highlight.module.scss';
import classNames from 'classnames';
import type { ReactNode } from 'react';

interface HighlightProps {
  children: ReactNode;
  color?: 'mint';
  variant?: 'text' | 'background';
}

const Highlight = ({ children, color = 'mint', variant = 'text' }: HighlightProps) => {
  return (
    <span className={classNames(styles.highlight, styles[color], styles[variant])}>{children}</span>
  );
};

export default Highlight;
