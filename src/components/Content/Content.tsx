import React from 'react'
import classNames from 'classnames'

import styles from './Content.module.scss'

export function HtmlContent({ content, className }: { content: string; className?: string }) {
  return <div className={classNames(styles.root, className)} dangerouslySetInnerHTML={{ __html: content }} />
}

export function Content({ content, className }: { content: string | React.ReactNode; className?: string }) {
  return <div className={classNames(styles.root, className)}>{content}</div>
}
