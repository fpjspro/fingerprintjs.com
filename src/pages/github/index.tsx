import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'

import WhyGoProSection from '../../components/githubPage/WhyGoProSection/WhyGoProSection'
import ProLayersSection from '../../components/githubPage/ProLayersSection/ProLayersSection'
import GetStartedSection from '../../components/githubPage/GetStartedSection/GetStartedSection'
import useSiteMetadata from '../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'

interface GitHubProps {
  pageContext: GeneratedPageContext
}
export default function GitHubPage({ pageContext }: GitHubProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'FingerprintJS Pro vs Open Source - Visitor Identification API Comparison',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <WhyGoProSection />
      <GetStartedSection />
      <ProLayersSection />
    </LayoutTemplate>
  )
}
