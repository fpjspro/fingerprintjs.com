import React from 'react'
import Post, { PostProps } from '../Post/Post'
import classNames from 'classnames'
import TagList from '../TagList/TagList'

import styles from './PostGrid.module.scss'

export interface PostGridProps {
  posts: Array<PostProps>
  name?: string
  link?: React.ReactNode
  tags?: string[]
  narrow?: boolean
}
export default function PostGrid({ posts, name, link, tags, narrow }: PostGridProps) {
  return (
    <div className={styles.root}>
      {tags && (
        <div className={styles.tags}>
          <h2>Tags</h2>
          <TagList tags={tags} />
        </div>
      )}

      <div className={styles.posts}>
        {name && (
          <div className={styles.row}>
            <h2>{name}</h2>
            {link}
          </div>
        )}
        <div className={classNames(styles.grid, { [styles.narrow]: narrow })}>
          {posts.map((post) => {
            return <Post key={post.path} {...post} />
          })}
        </div>
      </div>
    </div>
  )
}
