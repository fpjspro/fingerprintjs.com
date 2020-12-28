import { graphql, Link } from 'gatsby'
import React from 'react'
import Section from '../components/common/Section'
import Layout from '../components/Layout'
import Img from 'gatsby-image'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../helpers/types'
import Container from '../components/common/Container'
import classNames from 'classnames'
import { getRelativeUrl } from '../helpers/url'

import styles from './blog.module.scss'

interface BlogProps {
  data: GatsbyTypes.BlogQuery
  pageContext: BlogContext
}
export default function Blog({ data, pageContext }: BlogProps) {
  const { edges: posts } = data.allMarkdownRemark
  const breadcrumbs = pageContext.breadcrumb.crumbs

  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '/blog/' : `/blog/${currentPage - 1}/`
  const nextPage = `/blog/${currentPage + 1}/`

  return (
    <Layout>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <Section>
        <Container size='large'>
          <h1 className={styles.header}>Blog Articles</h1>

          <div className={styles.grid}>
            {posts.map(({ node: post }) => {
              if (!post.fields || !post.frontmatter || !post.frontmatter.metadata) {
                return null
              }

              const { publishDate = Date.now(), title = '', metadata } = post.frontmatter
              const { description = '', image } = metadata

              return (
                <Post
                  key={post.id}
                  title={title}
                  description={description}
                  publishDate={dateFormatter.format(new Date(publishDate))}
                  image={image as GatsbyTypes.File}
                  path={getRelativeUrl(metadata.url)}
                />
              )
            })}
          </div>

          {numPages > 1 && (
            <div className={classNames(styles.navigation, { [styles.first]: isFirst }, { [styles.last]: isLast })}>
              {!isFirst && (
                <Link to={prevPage} className={styles.link}>
                  ← Previous Page
                </Link>
              )}
              {!isLast && (
                <Link to={nextPage} className={styles.link}>
                  Next Page →
                </Link>
              )}
            </div>
          )}
        </Container>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Blog($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(blog)/.*\\.md$/" } }
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
              url
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

interface BlogContext extends GeneratedPageContext {
  currentPage: number
  numPages: number
}

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

interface PostProps {
  title: string
  description: string
  publishDate: string
  image?: GatsbyTypes.File
  path: string
}
function Post({ title, description, image, publishDate, path }: PostProps) {
  const imageFluid = image?.childImageSharp?.fluid

  return (
    <Link to={path} className={styles.post}>
      {imageFluid && (
        <div className={styles.wrapper}>
          <Img fluid={imageFluid} className={styles.image} />
        </div>
      )}

      <div className={styles.content}>
        <span className={styles.publishDate}>{publishDate}</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    </Link>
  )
}
