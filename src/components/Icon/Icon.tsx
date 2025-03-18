import styles from './Icon.module.scss';
import classNames from 'classnames';
import React from 'react';
import * as icons from '@/assets';

export type IconType = keyof typeof icons;

export interface IconProps {
  icon: IconType;
  size: number;
  color?: string;
  onClick?: () => void;
}

const Icon = ({ icon, size = 24, color, onClick }: IconProps) => {
  const SVGIcon = icons[icon];
  const shouldOverrideColor = color !== undefined;

  return (
    <button
      className={classNames(styles.iconContainer, { [styles.overrideColor]: shouldOverrideColor })}
      style={{ width: size, height: size, color }}
      onClick={onClick}
      disabled={!onClick}
    >
      <SVGIcon />
    </button>
  );
};

export default Icon;
