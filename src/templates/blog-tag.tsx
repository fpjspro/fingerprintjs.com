import { graphql } from 'gatsby'
import React from 'react'
import Section from '../components/common/Section'
import Layout from '../components/Layout'
import Container from '../components/common/Container'
import { PostProps } from '../components/Post/Post'
import PostGrid from '../components/PostGrid/PostGrid'
import { ArrayElement, GeneratedPageContext } from '../helpers/types'
import PaginationNav from '../components/PaginationNav/PaginationNav'
import { dateFormatter } from '../helpers/format'
import { kebabToTitle } from '../helpers/case'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'

interface BlogTagProps {
  data: GatsbyTypes.BlogTagQuery
  pageContext: BlogTagContext
}
export default function BlogTag({ data, pageContext }: BlogTagProps) {
  const { edges: posts } = data.allMarkdownRemark

  const { currentPage, numPages, tag } = pageContext
  const breadcrumbs = pageContext.breadcrumb.crumbs.filter(({ pathname }) => pathname !== '/blog/tag')

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
          <h1>{`${kebabToTitle(tag)}`} Articles</h1>

          <PostGrid
            posts={posts
              .map(({ node }) => node)
              .map(mapToPost)
              .map((post) => ({ ...post, activeTag: tag }))}
          />

          <PaginationNav currentPage={currentPage} numPages={numPages} basePath={`/blog/tag/${tag}`} />
        </Container>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogTag($skip: Int!, $limit: Int!, $tag: String) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(blog)/.*\\.md$/" }
        frontmatter: { tags: { in: [$tag] } }
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

interface BlogTagContext extends GeneratedPageContext {
  currentPage: number
  numPages: number
  tag: string
}

type PostQuery = NonNullable<
  ArrayElement<NonNullable<NonNullable<GatsbyTypes.BlogTagQuery['allMarkdownRemark']>['edges']>>['node']
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
