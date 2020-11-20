import React from 'react'
import classNames from 'classnames'
import styles from './Card.module.scss'

interface PricingCardProps {
  title: string
  description: string
  sectionClasses: string | string[]
  children: React.ReactNode
}

export default function PricingCard({ title, description, sectionClasses, children }: PricingCardProps) {
  return (
    <section className={classNames(styles.card, sectionClasses)}>
      <aside className={styles.aside}>
        <header className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </header>
      </aside>
      <div className={styles.content}>{children}</div>
    </section>
  )
}
