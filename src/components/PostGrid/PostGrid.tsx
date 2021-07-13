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
  perRow?: 'four' | 'three'
  nameIsCentered?: boolean
}
export default function PostGrid({ posts, name, nameIsCentered, link, tags, perRow = 'four' }: PostGridProps) {
  return (
    <div className={styles.root}>
      {tags && (
        <div className={styles.tags}>
          <h2>Tags</h2>
          <TagList tags={tags} direction='vertical' />
        </div>
      )}

      <div className={styles.posts}>
        {name && (
          <div className={classNames(styles.row, { [styles.alignNameCenter]: nameIsCentered === true })}>
            <h2 className={styles.name}>{name}</h2>
            {link}
          </div>
        )}
        <div className={classNames(styles.grid, { [styles.threePerRow]: perRow === 'three' })}>
          {posts.map((post) => {
            return <Post perRow={perRow} key={post.path} {...post} />
          })}
        </div>
      </div>
    </div>
  )
}
