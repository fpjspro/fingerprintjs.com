import React from 'react'

import styles from './BlockQuote.module.scss'

export interface BlockQuoteProps {
  author?: string
  children: React.ReactNode
}
export default function BlockQuote({ children, author }: BlockQuoteProps) {
  return (
    <blockquote className={styles.root}>
      <p className={styles.quote}>{children}</p>
      {author && <span className={styles.author}>{author}</span>}
    </blockquote>
  )
}
