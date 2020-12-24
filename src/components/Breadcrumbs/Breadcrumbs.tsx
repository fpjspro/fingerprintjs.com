import React from 'react'
import { Link } from 'gatsby'
import Container from '../common/Container'

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
    <Container size='large'>
      <nav className={styles.root}>
        {breadcrumbs.map(({ pathname: path, crumbLabel: label }, index) => {
          const isCurrent = index === breadcrumbs.length - 1

          return (
            <span key={path}>
              {index > 0 && <span className={styles.separator}>{separator}</span>}

              {isCurrent ? (
                <span className={styles.current}>{getDisplayLabel(label)}</span>
              ) : (
                <Link to={withTrailingSlash(path)} className={styles.link}>
                  {getDisplayLabel(label)}
                </Link>
              )}
            </span>
          )
        })}
      </nav>
    </Container>
  )
}

export function withTrailingSlash(path: string) {
  return path.endsWith('/') ? path : `${path}/`
}

export function getDisplayLabel(label: string) {
  return label[0].toUpperCase() + label.split('-').join(' ').substring(1)
}
