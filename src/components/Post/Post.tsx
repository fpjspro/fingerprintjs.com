import React from 'react'
import Img from 'gatsby-image'
import classNames from 'classnames'
import { getRelativeUrl } from '../../helpers/url'
import TagList from '../TagList/TagList'
import { graphql, Link } from 'gatsby'

import styles from './Post.module.scss'
import { dateFormatter } from '../../helpers/format'

export interface PostProps {
  title: string
  description: string
  publishDate: string
  image?: GatsbyTypes.File
  path: string
  featured?: boolean
  tags?: string[]
  activeTag?: string
  variant?: 'card' | 'wide'
}
export default function Post({
  title,
  description,
  image,
  publishDate,
  path,
  tags,
  activeTag,
  variant = 'card',
}: PostProps) {
  const imageFluid = image?.childImageSharp?.fluid

  return (
    <Link to={getRelativeUrl(path)} className={classNames(styles.post, { [styles.wide]: variant === 'wide' })}>
      {imageFluid && (
        <div className={styles.wrapper}>
          <Img fluid={imageFluid} className={styles.image} />
        </div>
      )}

      <div className={styles.content}>
        <div>
          <span className={styles.publishDate}>{publishDate}</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>

        {tags && <TagList tags={tags} activeTag={activeTag} format='upper' />}
      </div>
    </Link>
  )
}

export function mapToPost(data: any): PostProps {
  if (!data.frontmatter || !data.frontmatter.metadata) {
    throw new Error('Posts should always have frontmatter and metadata.')
  }

  const { publishDate = Date.now(), title = '', metadata, tags, featured } = data.frontmatter
  const { description = '', image, url } = metadata

  return {
    title,
    description,
    publishDate: dateFormatter.format(new Date(publishDate)),
    image: image as GatsbyTypes.File,
    path: url,
    featured,
    tags,
  } as PostProps
}

export const query = graphql`
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
          featured
        }
      }
    }
  }
`
