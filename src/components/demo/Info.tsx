import React from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'
import Collapsible from '../../components/common/Collapsible'
import styles from './Info.module.scss'

interface FeatureSectionProps {
  features: { icon: React.ReactNode; title: string }[]
}

export function FeatureSection({ features }: FeatureSectionProps) {
  return (
    <div className={classNames(styles.section, styles.feature)}>
      <h2 className={styles.title}>Unique Features</h2>

      <ul className={styles.list}>
        {features.map((feature) => (
          <li key={feature.title} className={styles.item}>
            {feature.icon}
            {feature.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

interface FAQSectionProps {
  faq: { question: string; answer: React.ReactNode }[]
}

export function FAQSection({ faq }: FAQSectionProps) {
  return (
    <div className={classNames(styles.section, styles.faq)}>
      <header className={styles.header}>
        <h2 className={styles.title}>Frequently Asked Questions</h2>
        <Link to={''} className={styles.link}>
          See&nbsp;all&nbsp;&gt;
        </Link>
      </header>

      <div>
        <Collapsible sections={faq.map((entry) => ({ title: entry.question, content: entry.answer }))} />
      </div>
    </div>
  )
}
