import { graphql } from 'gatsby'
import React from 'react'
import Section from '../components/common/Section'
import Layout from '../components/Layout'
import Container from '../components/common/Container'
import { PostProps } from '../components/Post/Post'
import PostGrid from '../components/PostGrid/PostGrid'
import { ArrayElement } from '../helpers/types'
import PaginationNav from '../components/PaginationNav/PaginationNav'
import { dateFormatter } from '../helpers/format'

interface BlogFeaturedProps {
  data: GatsbyTypes.BlogFeaturedQuery
  pageContext: BlogFeaturedContext
}
export default function BlogFeatured({ data, pageContext }: BlogFeaturedProps) {
  const { edges: posts } = data.allMarkdownRemark

  const { currentPage, numPages } = pageContext

  return (
    <Layout>
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
            }
            title
            publishDate
          }
        }
      }
    }
  }
`

interface BlogFeaturedContext {
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

  const { slug = '' } = data.fields
  const { publishDate = Date.now(), title = '', metadata } = data.frontmatter
  const { description = '', image } = metadata

  return {
    title: title,
    description: description,
    publishDate: dateFormatter.format(new Date(publishDate)),
    image: image as GatsbyTypes.File,
    path: slug,
  } as PostProps
}
