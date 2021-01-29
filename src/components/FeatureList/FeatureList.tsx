import React from 'react'
import { ReactComponent as DoneSvg } from './done.svg'

import styles from './FeatureList.module.scss'

interface FeatureListProps {
  title: string
  features: string[]
}
export default function FeatureList({ title, features }: FeatureListProps) {
  return (
    <div className={styles.root}>
      <h3 className={styles.header}>{title}</h3>

      <ul>
        {features.map((feature) => (
          <li key={feature} className={styles.feature}>
            <DoneSvg className={styles.checkbox} />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}
