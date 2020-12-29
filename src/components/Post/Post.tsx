import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import classNames from 'classnames'
import { withTrailingSlash } from '../../helpers/url'
import TagList from '../TagList/TagList'

import styles from './Post.module.scss'

export interface PostProps {
  title: string
  description: string
  publishDate: string
  image?: GatsbyTypes.File
  path: string
  featured?: boolean
  tags?: string[]
  activeTag?: string
}
export default function Post({ title, description, image, publishDate, path, featured, tags, activeTag }: PostProps) {
  const imageFluid = image?.childImageSharp?.fluid

  return (
    <Link to={withTrailingSlash(path)} className={classNames(styles.post, { [styles.featuredPost]: featured })}>
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
