import React, { useState } from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'

import styles from './DropdownMenu.module.scss'

export interface DropdownMenuProps {
  name: string
  list: Array<{ title: string; url: string; isLocal?: boolean }>
}
export default function DropdownMenu({ name, list }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <span onClick={() => setIsOpen(!isOpen)} className={styles.link}>
        {name}
      </span>

      <ul className={classNames(styles.list, { [styles.open]: isOpen })}>
        {list.map(({ title, url, isLocal = true }) => (
          <li key={name}>
            {isLocal ? (
              <Link to={url} className={styles.link}>
                {title}
              </Link>
            ) : (
              <a href={url} className={styles.link}>
                {title}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
