import React from 'react'
import Container from '../components/common/Container'
import Section from '../components/common/Section'
import { LayoutTemplate } from '../components/Layout'
import { GeneratedPageContext } from '../helpers/types'
import { useLocation } from '@reach/router'
import useSiteMetadata from '../hooks/useSiteMetadata'
import PaginationNav from '../components/PaginationNav/PaginationNav'
import PostGrid from '../components/PostGrid/PostGrid'
import { BASE_URL } from '../constants/content'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'

interface CaseStudyProps {
  pageContext: CaseStudiesContext
}
export default function CaseStudies({ pageContext }: CaseStudyProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'FingerprintJS Case Studies | FingerprintJS',
    description: 'Success stories from our customers.',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  const { currentPage, numPages } = pageContext

  // TODO [VL] This will be turned into a page query when integrating with the CMS.
  const caseStudies = [
    {
      title: 'Account sharing prevention in Edtech',
      description:
        'Read about how a SaaS educational technology company used FingerpringJS to significantly reduce unauthorized account sharing, increasing their annual recurring revenue by $4M+ ARR while keeping legitimate users happy.',
      publishDate: 'January 26, 2021',
      path: `${BASE_URL}case-studies/edtech/`,
    },
  ]

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <Section>
        <Container size='large'>
          <h1>Case Studies</h1>

          <PostGrid posts={caseStudies} perRow='four' />

          <PaginationNav currentPage={currentPage} numPages={numPages} basePath='/case-studies/' />
        </Container>
      </Section>
    </LayoutTemplate>
  )
}

interface CaseStudiesContext extends GeneratedPageContext {
  currentPage: number
  numPages: number
}
