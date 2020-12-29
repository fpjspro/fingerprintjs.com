import React from 'react'
import { Link } from 'gatsby'
import { kebabToTitle, kebabToUpper } from '../../helpers/case'
import classNames from 'classnames'

import styles from './TagList.module.scss'

export interface TagListProps {
  tags: string[]
  activeTag?: string
  format?: 'upper' | 'title'
}
export default function TagList({ tags, activeTag, format = 'upper' }: TagListProps) {
  function formatTag(tag: string) {
    switch (format) {
      case 'upper':
        return kebabToUpper(tag)
      case 'title':
        return kebabToTitle(tag)
    }
  }

  return (
    <ul className={styles.root}>
      {tags?.map((tag) => (
        <li key={tag} className={styles.item}>
          {tag === activeTag ? (
            <span className={classNames(styles.tag, styles.highlight)}>{formatTag(tag)}</span>
          ) : (
            <Link to={`/blog/tag/${tag}/`} className={styles.tag}>
              {formatTag(tag)}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}
