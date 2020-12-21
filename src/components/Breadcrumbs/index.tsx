import React from 'react'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import Container from '../common/Container'
import { baseUrl } from '../../constants/content'

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

export function BreadcrumbsSEO({ breadcrumbs }: { breadcrumbs: Array<Breadcrumb> }) {
  return (
    <Helmet>
      <script type='application/ld+json'>{getStructuredData(breadcrumbs)}</script>
    </Helmet>
  )
}

function getStructuredData(breadcrumbs: Array<Breadcrumb>): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map(({ pathname: path, crumbLabel: label }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: getDisplayLabel(label),
      item: `${baseUrl}${withTrailingSlash(path)}`,
    })),
  }

  return JSON.stringify(data)
}

function withTrailingSlash(path: string) {
  return path.endsWith('/') ? path : `${path}/`
}

function getDisplayLabel(label: string) {
  return label[0].toUpperCase() + label.split('-').join(' ').substring(1)
}
