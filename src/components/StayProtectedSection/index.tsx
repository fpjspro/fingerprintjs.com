import Container from '../common/Container'
import Section from '../common/Section'
import React from 'react'
import GetStartedForm, { FormProps } from '../GetStartedForm'
import styles from './StayProtectedSection.module.scss'

export default function StayProtectedSection({ formState, onSubmit, errorMessage }: FormProps) {
  return (
    <Section className={styles.stayProtected}>
      <Container>
        <header className={styles.header}>
          <h2 className={styles.title}>
            Stay <strong>protected</strong> and <strong>one step ahead</strong> of malicious users with FingerprintJS
            Pro
          </h2>
          <p className={styles.subtitle}>Starting today is better than starting tomorrow</p>
          <GetStartedForm
            className={styles.form}
            formState={formState}
            onSubmit={onSubmit}
            errorMessage={errorMessage}
          />
        </header>
      </Container>
    </Section>
  )
}
