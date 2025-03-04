import styles from './Button.module.scss';
import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'inactive';
  size?: 'small' | 'medium';
}

const Button = ({ variant = 'primary', size = 'medium', ...props }: Props) => {
  return (
    <button className={classNames(styles.button, styles[variant], styles[size])} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
