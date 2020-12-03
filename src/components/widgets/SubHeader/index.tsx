import React from 'react'

import styles from './SubHeader.module.scss'

export interface SubHeader {
  title: string
  subtitle?: string
}

export default function SubHeaderComponent({ title, subtitle }: SubHeader) {
  return (
    <header className={styles.subHeader}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <h3 className={styles.subtitle}>{subtitle}</h3>}
    </header>
  )
}
