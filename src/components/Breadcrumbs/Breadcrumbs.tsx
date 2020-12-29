import React from 'react'
import { Link } from 'gatsby'
import { withTrailingSlash } from '../../helpers/url'
import { kebabToStart } from '../../helpers/case'

import styles from './Breadcrumbs.module.scss'

export interface Breadcrumb {
  pathname: string
  crumbLabel: string
}

export interface BreadcrumbsProps {
  breadcrumbs: Array<Breadcrumb>
  separator?: string | React.ReactNode
}
export default function Breadcrumbs({ breadcrumbs, separator = <>&raquo;</> }: BreadcrumbsProps) {
  return (
    <nav className={styles.root}>
      {breadcrumbs.map(({ pathname: path, crumbLabel: label }, index) => {
        const isCurrent = index === breadcrumbs.length - 1

        return (
          <span key={path}>
            {index > 0 && <span className={styles.separator}>{separator}</span>}

            {isCurrent ? (
              <span className={styles.current}>{kebabToStart(label)}</span>
            ) : (
              <Link to={withTrailingSlash(path)} className={styles.link}>
                {kebabToStart(label)}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
