import React from 'react'
import classNames from 'classnames'

import styles from './SubHeader.module.scss'

type SubHeaderTextSize = 'small' | 'normal' | 'medium' | 'large'
type SubHeaderAlign = 'left' | 'right' | 'center'
type SubHeaderWeight = 'secondary' | 'primary'

export interface SubHeaderElement {
  text: string | React.ReactNode
  size?: SubHeaderTextSize
  weight?: SubHeaderWeight
}
export interface SubHeaderProps {
  title: SubHeaderElement
  subtitle?: SubHeaderElement
  label?: SubHeaderElement
  align?: SubHeaderAlign
  className?: string
}

export default function SubHeader({ title, subtitle, label, align = 'center', className }: SubHeaderProps) {
  const subtitleComponent =
    subtitle &&
    (typeof subtitle.text === 'string' ? (
      <h2
        className={classNames(
          styles.subtitle,
          sizeClasses(subtitle.size ?? 'small'),
          weightClasses(subtitle.weight ?? 'secondary')
        )}
      >
        {subtitle.text}
      </h2>
    ) : (
      subtitle.text
    ))

  return (
    <section className={classNames(styles.root, className, alignmentClasses(align))}>
      {label && (
        <span
          className={classNames(
            styles.label,
            sizeClasses(label.size ?? 'small'),
            weightClasses(label.weight ?? 'secondary')
          )}
        >
          {label.text}
        </span>
      )}

      <h1
        className={classNames(
          styles.title,
          { [styles.adjacent]: !!label },
          sizeClasses(title.size ?? 'medium'),
          weightClasses(title.weight ?? 'secondary')
        )}
      >
        {title.text}
      </h1>

      {subtitleComponent}
    </section>
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
    case 'primary':
      return styles.weightPrimary
    case 'secondary':
      return styles.weightSecondary
    default:
      return ''
  }
}
