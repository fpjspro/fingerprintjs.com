import { graphql, Link } from 'gatsby'
import React from 'react'
import Section from '../../components/common/Section'
import Layout from '../../components/Layout'
import Img from 'gatsby-image'
import Container from '../../components/common/Container'

import styles from './blog.module.scss'

export default function Blog({ data }: { data: GatsbyTypes.BlogQuery }) {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <Section>
        <Container size='large'>
          <h1 className={styles.header}>Blog Articles</h1>

          <div className={styles.grid}>
            {posts.map(({ node: post }) => {
              if (!post.fields || !post.frontmatter || !post.frontmatter.metadata) {
                return null
              }

              const { slug = '' } = post.fields
              const { publishDate = Date.now(), title = '', metadata } = post.frontmatter
              const { description = '', image } = metadata

              return (
                <Post
                  key={post.id}
                  title={title}
                  description={description}
                  publishDate={dateFormatter.format(new Date(publishDate))}
                  image={image as GatsbyTypes.File}
                  path={slug}
                />
              )
            })}
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Blog {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(blog)/" } }
      sort: { order: DESC, fields: frontmatter___publishDate }
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
