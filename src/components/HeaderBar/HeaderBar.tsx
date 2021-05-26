import React from 'react'
import Container from '../common/Container'

import styles from './HeaderBar.module.scss'

export interface headerBarProps {
  children: React.ReactNode
  href?: string
}

export default function HeaderBar({ children, href }: headerBarProps) {
  return href ? (
    <Container className={styles.container}>
      <div>
        <a className={styles.headerBar} href={href} target='_blank' rel='noreferrer'>
          {children}
        </a>
      </div>
    </Container>
  ) : (
    <Container className={styles.container}>
      <span className={styles.headerBar}>{children}</span>
    </Container>
  )
}
