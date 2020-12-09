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
          <h1 className={styles.header}>Blog landing page</h1>

          <Section className={styles.grid}>
            {posts.map(({ node: post }) => (
              <div key={post.id} className={styles.item}>
                <Post
                  title={post.frontmatter?.metadata?.title ?? ''}
                  description={post.frontmatter?.metadata?.description ?? ''}
                  publishDate={post.frontmatter?.publishDate ?? ''}
                  image={post.frontmatter?.metadata?.image}
                  path={post.fields?.slug ?? '/'}
                />
              </div>
            ))}
          </Section>
        </Container>
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Blog {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/(blog)/" } }) {
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
            publishDate
          }
        }
      }
    }
  }
`

interface PostProps {
  title: string
  description: string
  publishDate: string
  image?: any
  path: string
}
function Post({ title, description, image, publishDate, path }: PostProps) {
  return (
    <Link to={path} className={styles.post}>
      {image && <Img fluid={image.childImageSharp.fluid} className={styles.image} />}

      <div className={styles.content}>
        <span className={styles.publishDate}>{publishDate}</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    </Link>
  )
}
