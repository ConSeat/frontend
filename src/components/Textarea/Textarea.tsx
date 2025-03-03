import styles from './Textarea.module.scss';
import classNames from 'classnames';
import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = ({ error, ...props }: TextareaProps) => {
  return (
    <div className={styles.textareaWrapper}>
      <textarea
        className={classNames(styles.textarea, { [styles.error]: error })}
        maxLength={props.maxLength}
        {...props}
      />
      <div className={styles.charCount}>
        <span className={styles.valueLength}>{props.value?.toString().length}</span>
        <span className={styles.maxLength}>/{props.maxLength}</span>
      </div>
    </div>
  );
};

export default Textarea;
