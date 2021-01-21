import React from 'react'

import styles from './CustomerOverview.module.scss'

interface Bullet {
  value: string
  description: string
}
export interface CustomerOverviewProps {
  logo?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  description: string
  bullets: Bullet[]
}
export default function CustomerOverview({ logo: LogoSvg, description, bullets }: CustomerOverviewProps) {
  return (
    <div className={styles.root}>
      <h3 className={styles.header}>Customer Overview</h3>
      {LogoSvg && <LogoSvg className={styles.logo} />}
      <p className={styles.description}>{description}</p>

      <table className={styles.table}>
        {bullets.map(({ value, description }) => (
          <tr key={value}>
            <td className={styles.key}>
              <strong className={styles.strong}>{value}</strong>
            </td>
            <td className={styles.value}>{description}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}
