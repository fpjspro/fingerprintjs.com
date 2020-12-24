import React from 'react'
import { ReactComponent as ExpandMoreSvg } from '../../img/expand-more.svg'
import { Link } from 'gatsby'
import classNames from 'classnames'

import styles from './DropdownList.module.scss'

export interface DropdownListProps {
  name: string
  list: Array<{ title: string; url: string; isLocal?: boolean }>
}
export default function DropdownList({ name, list }: DropdownListProps) {
  return (
    <div className={classNames(styles.dropdown)}>
      <span className={styles.link}>
        {name}
        <ExpandMoreSvg className={styles.icon} />
      </span>

      <div className={styles.list}>
        {list.map(({ title, url, isLocal = true }) =>
          isLocal ? (
            <Link to={url} key={title} className={classNames(styles.item, styles.link)}>
              {title}
            </Link>
          ) : (
            <a href={url} key={title} className={classNames(styles.item, styles.link)}>
              {title}
            </a>
          )
        )}
      </div>
    </div>
  )
}
