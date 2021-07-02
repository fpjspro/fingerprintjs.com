import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import { URL, DOC_URL, MAILTO } from '../../../constants/content'

import styles from './NextStepsSection.module.scss'

export default function NextStepsSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container} size='large'>
        <header className={styles.sectionHeader}>
          <h1 className={styles.title}>Next Steps with FingerprintJS Pro</h1>
        </header>
        <div className={styles.stepsSection}>
          <Step step='Try FingerprintJS free' url={URL.dashboardLoginUrl} linkText='Create account today >'>
            Start your free 30-day trial and get 100% of features with no usage limits.
          </Step>
          <Step step='Read our docs' url={DOC_URL.documentationUrl} linkText='View docs >'>
            Learn how to implement FingerprintJS Pro on your website and start collecting VisitorIDs.
          </Step>
          <Step step='Reach out with questions' url={MAILTO.mailToUrl} linkText='Contact support >'>
            We would love to help out! Reach out to support via email or chat anytime.
          </Step>
          <Step step='Subscribe to our newsletter' url={URL.newsletterUrl} linkText='Sign up for updates >'>
            Stay up to date with the latest in browser fingerprinting and user identification news.
          </Step>
        </div>
      </Container>
    </Section>
  )
}

interface StepProps {
  step: string
  children: string
  url: string
  linkText: string
}
function Step({ step, children, url, linkText }: StepProps) {
  return (
    <>
      <div className={styles.stepCard}>
        <div className={styles.stepNumber} />
        <h1 className={styles.stepTitle}>{step}</h1>
        <p className={styles.stepDescription}>{children}</p>
        <a className={styles.stepLink} href={url} target='_blank' rel='noreferrer'>
          {linkText}
        </a>
      </div>
    </>
  )
}
