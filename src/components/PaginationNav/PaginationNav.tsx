import React from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'

import styles from './PaginationNav.module.scss'

interface PaginationNavProps {
  currentPage: number
  numPages: number
  basePath: string
}
export default function PaginationNav({ currentPage, numPages, basePath }: PaginationNavProps) {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? basePath : `${basePath}${currentPage - 1}/`
  const nextPage = `${basePath}${currentPage + 1}/`

  return numPages > 1 ? (
    <div className={classNames(styles.root, { [styles.first]: isFirst }, { [styles.last]: isLast })}>
      {!isFirst && (
        <Link to={prevPage} className={styles.link}>
          ← Previous Page
        </Link>
      )}
      {!isLast && (
        <Link to={nextPage} className={styles.link}>
          Next Page →
        </Link>
      )}
    </div>
  ) : null
}
