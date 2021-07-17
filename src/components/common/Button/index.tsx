import React from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'clear' | 'faded'
  small?: boolean
  big?: boolean
  href?: string
  mobileIcon?: React.ReactNode
  children?: React.ReactNode
  label?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  download?: boolean
  openNewTab?: boolean
}

export default function Button({
  variant = 'primary',
  small,
  big,
  href,
  className = '',
  mobileIcon,
  children,
  type,
  label = '',
  onClick,
  download,
  openNewTab,
}: ButtonProps) {
  const classes = classNames(
    styles.button,
    { [styles.outlined]: variant === 'outline' },
    { [styles.clear]: variant === 'clear' },
    { [styles.faded]: variant === 'faded' },
    { [styles.small]: small },
    { [styles.big]: big },
    className
  )

  return href ? (
    <a
      href={href}
      className={classes}
      onClick={onClick}
      aria-label={label}
      download={download}
      target={openNewTab ? '_blank' : undefined}
      rel={openNewTab ? 'noreferrer' : undefined}
    >
      {mobileIcon && <span className={styles.mobileOnly}>{mobileIcon}</span>}
      <span className={classNames({ [styles.desktopOnly]: mobileIcon })}>{children}</span>
    </a>
  ) : (
    <button type={type} className={classes} onClick={onClick} aria-label={label}>
      {mobileIcon && <span className={classNames(styles.icon, styles.mobileOnly)}>{mobileIcon}</span>}
      <span className={classNames({ [styles.desktopOnly]: mobileIcon })}>{children}</span>
    </button>
  )
}
