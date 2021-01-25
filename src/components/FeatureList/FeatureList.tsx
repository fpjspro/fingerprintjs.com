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
            <FeatureCheckbox />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FeatureCheckbox() {
  return (
    <span className={styles.checkbox}>
      <DoneSvg className={styles.icon} />
    </span>
  )
}
