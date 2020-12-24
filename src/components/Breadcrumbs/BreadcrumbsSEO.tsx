import React from 'react'
import { Helmet } from 'react-helmet'
import { BASE_URL } from '../../constants/content'
import { Breadcrumb, getDisplayLabel } from './Breadcrumbs'
import { withTrailingSlash } from '../../helpers/url'

export default function BreadcrumbsSEO({ breadcrumbs }: { breadcrumbs: Array<Breadcrumb> }) {
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
      item: `${BASE_URL}${withTrailingSlash(path)}`,
    })),
  }

  return JSON.stringify(data)
}
