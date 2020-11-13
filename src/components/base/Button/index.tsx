import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

interface ButtonProps extends Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className'>{
  variant?: 'primary' | 'outline' | 'clear';
  href?: string;
  mobileIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export default function Button({
  variant = 'primary', 
  href,
  className = '',
  mobileIcon,
  children,
  type,
}: ButtonProps) {
  const classes = classNames(
    styles.button, 
    {[styles.outlined]: variant === 'outline'}, 
    {[styles.clear]: variant === 'clear'}, 
    className,
  );
  
  return href ? (
    <a 
      href={href} 
      className={classes}>
      {mobileIcon && <span className={styles.mobileOnly}>
        {mobileIcon}
      </span>} 
      <span className={classNames({[styles.desktopOnly]: mobileIcon})}>
        {children}
      </span> 
    </a>) : (
    <button 
      type={type}
      className={classes}>
      {mobileIcon && 
        <span className={classNames(styles.icon, styles.mobileOnly)}>
          {mobileIcon}
        </span>
      } 
      <span className={classNames({[styles.desktopOnly]: mobileIcon})}>
        {children}
      </span> 
    </button>
  )
}
