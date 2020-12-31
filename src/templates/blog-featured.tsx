import { graphql } from 'gatsby'
import React from 'react'
import Section from '../components/common/Section'
import Layout from '../components/Layout'
import Container from '../components/common/Container'
import { mapToPost } from '../components/Post/Post'
import PostGrid from '../components/PostGrid/PostGrid'
import { GeneratedPageContext } from '../helpers/types'
import PaginationNav from '../components/PaginationNav/PaginationNav'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'

interface BlogFeaturedProps {
  data: GatsbyTypes.BlogFeaturedQuery
  pageContext: BlogFeaturedContext
}
export default function BlogFeatured({ data, pageContext }: BlogFeaturedProps) {
  const { edges: posts } = data.allMarkdownRemark

  const { currentPage, numPages } = pageContext
  const breadcrumbs = pageContext.breadcrumb.crumbs

  return (
    <Layout>
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
    </Layout>
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
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            metadata {
              title
              description
              image {
                childImageSharp {
                  fluid(maxWidth: 512, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              url
            }
            title
            publishDate
            tags
          }
        }
      }
    }
  }
`

interface BlogFeaturedContext extends GeneratedPageContext {
  currentPage: number
  numPages: number
}
