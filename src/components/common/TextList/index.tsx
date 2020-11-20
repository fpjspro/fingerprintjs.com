import React from 'react'
import { CommonProps } from 'types/prop-types'
import classNames from 'classnames'

import styles from './TestList.module.scss'

interface TextListProps {
  ordered?: boolean
  items: string[]
}
export default function TextList({ ordered = false, items }: TextListProps) {
  const ParentElement = ordered ? Ordered : Unordered

  return (
    <ParentElement className={classNames(styles.root, ordered && styles.rootOrdered)}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          {item}
        </li>
      ))}
    </ParentElement>
  )
}

const Unordered = ({ children, className }: React.PropsWithChildren<CommonProps>) => (
  <ul className={className}>{children}</ul>
)
const Ordered = ({ children, className }: React.PropsWithChildren<CommonProps>) => (
  <ol className={className}>{children}</ol>
)
