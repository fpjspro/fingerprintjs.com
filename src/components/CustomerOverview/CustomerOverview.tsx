import React from 'react'

import styles from './CustomerOverview.module.scss'

export interface CustomerOverviewProps {
  logo: string
  description: string
  bullets: Array<{ value: string; description: string }>
}
export default function CustomerOverview({ logo, description, bullets }: CustomerOverviewProps) {
  return (
    <div className={styles.root}>
      <h3 className={styles.header}>Customer Overview</h3>
      <img alt='Customer Logo' className={styles.logo} src={logo} />
      <p className={styles.description}>{description}</p>

      <ul>
        {bullets.map(({ value, description }) => (
          <li key={value} className={styles.bullet}>
            <strong className={styles.strong}>{value}</strong>
            {description}
          </li>
        ))}
      </ul>
    </div>
  )
}
