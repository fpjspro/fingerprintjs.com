import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext, PageLocation } from '../../helpers/types'

import DemoSection from '../../components/demo/DemoSection'
import InfoSection from '../../components/demo/InfoSection'
import SignupSection from '../../components/demo/SignupSection'
import useSiteMetadata from '../../hooks/useSiteMetadata'

interface DemoPageProps {
  pageContext: GeneratedPageContext
  location: PageLocation
}
export default function DemoPage({ pageContext, location }: DemoPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const siteMetadata = {
    ...useSiteMetadata(),
    title: 'Technical Demo - FingerprintJS Pro',
    url: location.href,
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
