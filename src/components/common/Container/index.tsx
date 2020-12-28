import React from 'react'
import styles from './Container.module.scss'
import classNames from 'classnames'

export default function Container({
  children,
  size = 'regular',
  className,
}: {
  children: React.ReactNode
  size?: 'small' | 'regular' | 'large'
  className?: string | string[]
}) {
  return (
    <div
      className={classNames(
        styles.container,
        { [styles.small]: size === 'small' },
        { [styles.large]: size === 'large' },
        className
      )}
    >
      {children}
    </div>
  )
}
