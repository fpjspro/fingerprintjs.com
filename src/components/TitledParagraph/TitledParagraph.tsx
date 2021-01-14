import React from 'react'

import styles from './TitledParagraph.module.scss'

export interface TitledParagraphProps {
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  title: string
  children: React.ReactNode
}
export default function TitledParagraph({ icon: IconComponent, title, children }: TitledParagraphProps) {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        {IconComponent && (
          <div className={styles.iconContainer}>
            <IconComponent className={styles.icon} />
          </div>
        )}
        <h4 className={styles.title}>{title}</h4>
      </header>

      <div>{children}</div>
    </div>
  )
}
