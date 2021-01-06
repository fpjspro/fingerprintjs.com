import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'

import DemoSection from '../../components/demo/DemoSection'
import InfoSection from '../../components/demo/InfoSection'
import SignupSection from '../../components/demo/SignupSection'
import useSiteMetadata from '../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'

interface DemoPageProps {
  pageContext: GeneratedPageContext
}
export default function DemoPage({ pageContext }: DemoPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'Technical Demo - FingerprintJS Pro',
    url: `${siteMetadata.url}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <DemoSection />
      <InfoSection />
      <SignupSection />
    </LayoutTemplate>
  )
}
