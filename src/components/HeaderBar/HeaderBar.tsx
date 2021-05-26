import React from 'react'
import Container from '../common/Container'

import styles from './HeaderBar.module.scss'

export interface headerBarProps {
  children: string
  linkText?: string
  linkUrl?: string
}

export default function HeaderBar({ children, linkText, linkUrl }: headerBarProps) {
  return linkUrl ? (
    <Container className={styles.container}>
      <div className={styles.headerBar}>
        <div className={styles.text}>{children}</div>
        <a className={styles.link} href={linkUrl} target='_blank' rel='noreferrer'>
          {linkText}
        </a>
      </div>
    </Container>
  ) : (
    <Container className={styles.container}>
      <span className={styles.text}>{children}</span>
    </Container>
  )
}
