import { graphql } from 'gatsby'
import React from 'react'
import Section from '../components/common/Section'
import { LayoutTemplate } from '../components/Layout'
import Container from '../components/common/Container'
import { PostProps } from '../components/Post/Post'
import PostGrid from '../components/PostGrid/PostGrid'
import { ArrayElement, GeneratedPageContext } from '../helpers/types'
import PaginationNav from '../components/PaginationNav/PaginationNav'
import { dateFormatter } from '../helpers/format'
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
    url: `${siteMetadata.url}${pathname}`,
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

type PostQuery = NonNullable<
  ArrayElement<NonNullable<NonNullable<GatsbyTypes.BlogFeaturedQuery['allMarkdownRemark']>['edges']>>['node']
>
function mapToPost(data: PostQuery): PostProps {
  if (!data.fields || !data.frontmatter || !data.frontmatter.metadata) {
    throw new Error('Posts should always have fields, frontmatter and metadata.')
  }

  const { publishDate = Date.now(), title = '', metadata, tags } = data.frontmatter
  const { description = '', image, url } = metadata

  return {
    title,
    description,
    publishDate: dateFormatter.format(new Date(publishDate)),
    image: image as GatsbyTypes.File,
    path: url,
    tags,
  } as PostProps
}
