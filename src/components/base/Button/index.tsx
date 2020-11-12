import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

interface ButtonProps {
  variant?: 'primary' | 'outline' | 'clear';
  href?: string;
  className?: string | string[];
  mobileIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export default function Button({
  variant = 'primary', 
  href,
  className = '',
  mobileIcon,
  children,
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
      className={classes}>
      {mobileIcon && <span className={styles.mobileOnly}>
        {mobileIcon}
        </span>} 
      <span className={classNames({[styles.desktopOnly]: mobileIcon})}>
        {children}
      </span> 
    </button>
  )
}
