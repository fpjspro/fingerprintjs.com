import { graphql, Link } from 'gatsby'
import React from 'react'
import Section from '../components/common/Section'
import Layout from '../components/Layout'
import Container from '../components/common/Container'
import Post, { mapToPost, PostProps } from '../components/Post/Post'
import PostGrid from '../components/PostGrid/PostGrid'
import PaginationNav from '../components/PaginationNav/PaginationNav'
import { GeneratedPageContext } from '../helpers/types'

import styles from './blog.module.scss'

interface BlogProps {
  data: GatsbyTypes.BlogQuery
  pageContext: BlogContext
}
export default function Blog({ data, pageContext }: BlogProps) {
  const { edges: posts } = data.posts
  const { edges: featuredPosts } = data.featuredPosts
  const tags = data.tags.group.map(({ tag }) => tag) as string[]

  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1

  return (
    <Layout>
      <Section>
        <Container size='large'>
          <h1>Blog Articles</h1>

          {isFirst && <Featured featuredPosts={featuredPosts.map(({ node }) => node).map(mapToPost)} />}
          <PostGrid name='All Articles' posts={posts.map(({ node }) => node).map(mapToPost)} tags={tags} narrow />

          <PaginationNav currentPage={currentPage} numPages={numPages} basePath='/blog/' />
        </Container>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  fragment PostData on MarkdownRemarkConnection {
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

  query Blog($skip: Int!, $limit: Int!) {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(blog)/.*\\.md$/" } }
      sort: { order: DESC, fields: frontmatter___publishDate }
      limit: $limit
      skip: $skip
    ) {
      ...PostData
    }

    featuredPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(blog)/.*\\.md$/" }
        frontmatter: { featured: { eq: true } }
      }
      sort: { order: DESC, fields: frontmatter___publishDate }
      limit: 5
    ) {
      ...PostData
    }

    tags: allMarkdownRemark {
        group(field: frontmatter___tags) {
          tag: fieldValue
        }
      }
  }
`

interface BlogContext extends GeneratedPageContext {
  currentPage: number
  numPages: number
}

function Featured({ featuredPosts }: { featuredPosts: Array<PostProps> }) {
  const hasMainFeaturedPost = featuredPosts.length > 0
  const hasFeaturedPosts = featuredPosts.length - 1 > 0

  return (
    <div>
      {hasMainFeaturedPost && <Post {...featuredPosts[0]} wide />}
      {hasFeaturedPosts && (
        <PostGrid
          name='Featured'
          posts={featuredPosts.slice(1)}
          link={
            <Link to='/blog/featured/' className={styles.link}>
              See all →
            </Link>
          }
        />
      )}
    </div>
  )
}
