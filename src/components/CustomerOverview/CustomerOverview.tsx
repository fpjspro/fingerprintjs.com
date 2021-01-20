import React from 'react'

import styles from './CustomerOverview.module.scss'

interface Bullet {
  value: string
  description: string
}
export interface CustomerOverviewProps {
  logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  description: string
  bullets: Bullet[]
}
export default function CustomerOverview({ logo: LogoSvg, description, bullets }: CustomerOverviewProps) {
  return (
    <div className={styles.root}>
      <h3 className={styles.header}>Customer Overview</h3>
      <LogoSvg className={styles.logo} />
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
