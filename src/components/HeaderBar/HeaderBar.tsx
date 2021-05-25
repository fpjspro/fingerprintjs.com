import React from 'react'
import Container from '../common/Container'

import styles from './HeaderBar.module.scss'

interface headerBarProps {
  children: string
  href?: string
}

export default function HeaderBar({ children, href }: headerBarProps) {
  return href ? (
    <div className={styles.top}>
      <Container size='large'>
        <div className={styles.headerBar}>
          <a href={href} target='_blank' rel='noreferrer'>
            {children}
          </a>
        </div>
      </Container>
    </div>
  ) : (
    <div className={styles.top}>
      <Container size='large'>
        <span className={styles.headerBar}>{children}</span>
      </Container>
    </div>
  )
}
