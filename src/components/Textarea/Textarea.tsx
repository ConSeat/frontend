import styles from './Textarea.module.scss';
import classNames from 'classnames';
import { TextareaHTMLAttributes, useRef, useState } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = ({ error, value: propValue, onChange, ...props }: TextareaProps) => {
  const [value, setValue] = useState(propValue || '');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    handleResizeHeight();
    onChange?.(e);
  };

  return (
    <div className={styles.textareaWrapper}>
      <textarea
        ref={textareaRef}
        className={classNames(styles.textarea, { [styles.error]: error })}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {props.maxLength && (
        <div className={styles.charCount}>
          <span className={styles.valueLength}>{value.toString().length}</span>
          <span className={styles.maxLength}>/{props.maxLength}</span>
        </div>
      )}
    </div>
  );
};

export default Textarea;
