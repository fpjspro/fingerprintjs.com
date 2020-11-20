import React from 'react'
import FpjsWidget from '../FpjsWidget'
import GetStartedForm from '../GetStartedForm'
import Container from '../common/Container'
import Section from '../common/Section'
import styles from './LiveDemoSection.module.scss'

export default function LiveDemoSection() {
  return (
    <Section className={styles.liveDemo}>
      <Container size='large' className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Browser Fingerprinting API</h1>
          <p className={styles.description}>
            Stop fraud, spam, and account takeovers with
            <em> 99.5% accurate </em>
            browser fingerprinting as a service.
          </p>
          <GetStartedForm />
        </header>
        <div className={styles.content} style={{ position: 'relative' }}>
          <FpjsWidget />
        </div>
      </Container>
    </Section>
  )
}
