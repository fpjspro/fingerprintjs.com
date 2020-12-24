import React from 'react'
import classNames from 'classnames'

import styles from './SubHeader.module.scss'

type SubHeaderTextSize = 'small' | 'normal' | 'medium' | 'large'
type SubHeaderAlign = 'left' | 'right' | 'center'
type SubHeaderWeight = 'normal' | 'bold'

export interface SubHeader {
  title: string
  titleSize?: SubHeaderTextSize
  titleWeight?: SubHeaderWeight
  subtitle?: string
  subtitleSize?: SubHeaderTextSize
  align?: SubHeaderAlign
  className?: string
}

export default function SubHeaderComponent({
  title,
  titleSize = 'medium',
  titleWeight = 'normal',
  subtitle,
  subtitleSize = 'small',
  align = 'center',
  className,
}: SubHeader) {
  return (
    <header className={classNames(styles.root, className, alignmentClasses(align))}>
      <h1 className={classNames(styles.title, sizeClasses(titleSize), weightClasses(titleWeight))}>{title}</h1>
      {subtitle && <h3 className={classNames(styles.subtitle, sizeClasses(subtitleSize))}>{subtitle}</h3>}
    </header>
  )
}

function alignmentClasses(alignment: SubHeaderAlign): string {
  switch (alignment) {
    case 'left':
      return styles.left
    case 'right':
      return styles.right
    case 'center':
      return styles.center
    default:
      return ''
  }
}

function sizeClasses(size: SubHeaderTextSize): string {
  switch (size) {
    case 'small':
      return styles.small
    case 'normal':
      return styles.normal
    case 'medium':
      return styles.medium
    case 'large':
      return styles.large
    default:
      return ''
  }
}

function weightClasses(weight: SubHeaderWeight): string {
  switch (weight) {
    case 'normal':
      return styles.weightNormal
    case 'bold':
      return styles.weightBold
    default:
      return ''
  }
}
