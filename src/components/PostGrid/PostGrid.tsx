import React from 'react'
import Post, { PostProps } from '../Post/Post'

import styles from './PostGrid.module.scss'

export interface PostGridProps {
  posts: Array<PostProps>
  name?: string
  link?: React.ReactNode
}
export default function PostGrid({ posts, name, link }: PostGridProps) {
  return (
    <div className={styles.root}>
      {name && (
        <div className={styles.row}>
          <h2>{name}</h2>
          {link}
        </div>
      )}

      <div className={styles.grid}>
        {posts.map((post) => {
          return <Post key={post.path} {...post} />
        })}
      </div>
    </div>
  )
}
