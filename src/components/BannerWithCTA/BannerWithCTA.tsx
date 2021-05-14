import React from 'react'
import classNames from 'classnames'
import styles from './BannerWithCTA.module.scss'
import Button from '../common/Button'

export interface BannerWithCTAProps {
  title: string
  description: string
  className?: string
  ctaText: string
  ctaHref: string
  variant?: 'primary' | 'outline' | 'clear' | 'faded'
}

export default function BannerWithCTA({
  title,
  description,
  className,
  ctaText,
  ctaHref,
  variant,
}: BannerWithCTAProps) {
  return (
    <section className={classNames(styles.banner, className)}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <Button href={ctaHref} variant={variant} className={styles.button}>
        {ctaText}
      </Button>
    </section>
  )
}
