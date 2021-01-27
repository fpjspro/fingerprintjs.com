// import { graphql } from 'gatsby'
import React from 'react'
import Container from '../components/common/Container'
import Section from '../components/common/Section'
import { LayoutTemplate } from '../components/Layout'
import { GeneratedPageContext } from '../helpers/types'
import { useLocation } from '@reach/router'
import useSiteMetadata from '../hooks/useSiteMetadata'
import PaginationNav from '../components/PaginationNav/PaginationNav'
import PostGrid from '../components/PostGrid/PostGrid'
// import { PostProps } from '../components/Post/Post'
import { BASE_URL } from '../constants/content'

interface CaseStudyProps {
  // data: GatsbyTypes.CaseStudiesQuery
  pageContext: CaseStudiesContext
}
export default function CaseStudies({ /* data, */ pageContext }: CaseStudyProps) {
  // const { edges: caseStudies } = data.allMarkdownRemark

  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'FingerprintJS Case Studies | FingerprintJS',
    description: 'Success stories from our customers.',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  const { currentPage, numPages } = pageContext

  const caseStudies = [
    {
      title: 'Account sharing prevention in Edtech',
      description:
        'Read about how a SaaS educational technology company used FingerpringJS to significantly reduce unauthorized account sharing, increasing their annual recurring revenue by $2M+ ARR while keeping legitimate users happy.',
      publishDate: 'January 26, 2021',
      path: `${BASE_URL}/case-studies/edtech`,
    },
  ]

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
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

// export const pageQuery = graphql`
//   query CaseStudies($skip: Int!, $limit: Int!) {
//     posts: allMarkdownRemark(
//       filter: { fileAbsolutePath: { regex: "/(case-studies)/.*\\.md$/" } }
//       sort: { order: DESC, fields: frontmatter___publishDate }
//       limit: $limit
//       skip: $skip
//     ) {

//     }
// `

interface CaseStudiesContext extends GeneratedPageContext {
  currentPage: number
  numPages: number
}

// type CaseStudy = Record<string, string>
// function makePost(caseStudy: CaseStudy) {
//   return {
//     title: '',
//     description: '',
//     publishDate: '',
//     path: '',
//   } as PostProps
// }
