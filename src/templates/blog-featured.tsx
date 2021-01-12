import { graphql } from 'gatsby'
import React from 'react'
import Section from '../components/common/Section'
import { LayoutTemplate } from '../components/Layout'
import Container from '../components/common/Container'
import { mapToPost } from '../components/Post/Post'
import PostGrid from '../components/PostGrid/PostGrid'
import { GeneratedPageContext } from '../helpers/types'
import PaginationNav from '../components/PaginationNav/PaginationNav'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import useSiteMetadata from '../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'

interface BlogFeaturedProps {
  data: GatsbyTypes.BlogFeaturedQuery
  pageContext: BlogFeaturedContext
}
export default function BlogFeatured({ data, pageContext }: BlogFeaturedProps) {
  const { edges: posts } = data.allMarkdownRemark

  const { currentPage, numPages } = pageContext
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'Featured Articles - FingerprintJS Blog | FingerprintJS',
    description:
      'We are an open source powered company working to prevent online fraud for websites of all sizes. Read our latest and greatest featured articles on our blog.',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && (
        <>
          <BreadcrumbsSEO breadcrumbs={breadcrumbs} />
          <Container size='large'>
            <Breadcrumbs breadcrumbs={breadcrumbs.slice(1)} />
          </Container>
        </>
      )}

      <Section>
        <Container size='large'>
          <h1>Featured Articles</h1>

          <PostGrid posts={posts.map(({ node }) => node).map(mapToPost)} />

          <PaginationNav currentPage={currentPage} numPages={numPages} basePath='/blog/featured/' />
        </Container>
      </Section>
    </LayoutTemplate>
  )
}

export const pageQuery = graphql`
  query BlogFeatured($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(blog)/.*\\.md$/" }
        frontmatter: { featured: { eq: true } }
      }
      sort: { order: DESC, fields: frontmatter___publishDate }
      limit: $limit
      skip: $skip
    ) {
      ...PostData
    }
  }
`

interface BlogFeaturedContext extends GeneratedPageContext {
  currentPage: number
  numPages: number
}
