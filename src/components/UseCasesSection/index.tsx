import React from 'react'
import { ReactComponent as AccountFraudSvg } from './account_fraud.svg'
import Container from '../common/Container'
import Section from '../common/Section'
import styles from './UseCasesSection.module.scss'
import classNames from 'classnames'

export default function UseCasesSection({ blurbs }) {
  return (
    <Section className={styles.section}>
      <Container>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            FingerprintJS
            <br />
            <strong>Use Cases</strong>
          </h2>
        </header>
        <div className={styles.content}>
          <div className={styles.useCases}>
            {blurbs.map((blurb, i) => {
              return (
                <div key={`use-case_${i}_${blurb.title}`} className={classNames(styles.useCase, styles.large)}>
                  <div className={styles.iconContainer}>
                    <AccountFraudSvg className={styles.icon} />
                  </div>
                  <div className={styles.info}>
                    <h3 className={styles.title}>{blurb.title}</h3>
                    <p className={styles.description}>{blurb.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
