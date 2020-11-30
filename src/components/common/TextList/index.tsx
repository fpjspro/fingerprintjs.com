import React from 'react'
import classNames from 'classnames'
import styles from './TextList.module.scss'
import { CommonProps } from '../../../types/prop-types'

interface TextListProps {
  ordered?: boolean
  items: string[]
  className?: string | string[]
}
export default function TextList({ ordered = false, items, className }: TextListProps) {
  const ParentElement = ordered ? Ordered : Unordered

  return (
    <ParentElement className={classNames(className, styles.root, ordered && styles.rootOrdered)}>
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
