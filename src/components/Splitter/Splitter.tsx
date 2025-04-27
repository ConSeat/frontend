import styles from './Splitter.module.scss';
import type { HTMLAttributes } from 'react';

interface SplitterProps extends HTMLAttributes<HTMLDivElement> {
  height?: string;
  width?: string;
  color?: string;
}

const Splitter = ({
  height = '1px',
  width = '100%',
  color = 'sub-gray7',
  style,
  ...props
}: SplitterProps) => {
  const className = styles[`splitter-${color}`] || styles['splitter-sub-gray7'];

  return (
    <div
      className={`${styles.splitter} ${className}`}
      style={{ ...style, height, width }}
      {...props}
    />
  );
};

export default Splitter;
