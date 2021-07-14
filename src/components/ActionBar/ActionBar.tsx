import React from 'react'

import styles from './ActionBar.module.scss'
import { displayDateFormatter } from '../../helpers/format'

export interface ActionBarProps {
  publishDate: string
}
export default function ActionBar({ publishDate }: ActionBarProps) {
  const date = displayDateFormatter.format(new Date(publishDate))
  return (
    <div>
      <span className={styles.publishDate}>{date}</span>
    </div>
  )
}
