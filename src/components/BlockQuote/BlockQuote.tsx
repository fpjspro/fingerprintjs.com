import React from 'react'
import classNames from 'classnames'

import styles from './BlockQuote.module.scss'

export interface BlockQuoteProps {
  author?: string
  children: React.ReactNode
  className?: string
}
export default function BlockQuote({ children, author, className }: BlockQuoteProps) {
  return (
    <blockquote className={classNames(styles.root, className)}>
      <p className={styles.quote}>{children}</p>
      {author && <span className={styles.author}>{author}</span>}
    </blockquote>
  )
}
