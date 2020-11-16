import React from 'react'
import FpjsWidget from '../FpjsWidget'
import GetStartedForm from '../GetStartedForm'
import Container from '../common/Container'
import styles from './LiveDemoSection.module.scss'
import Section from '../common/Section'
import { FormProps } from 'interfaces/formProps'
import { FpjsWidgetProps } from 'interfaces/fpjsWidgetProps'

export default function LiveDemoSection({formState, onSubmit, errorMessage, endpoint, visitorId, apiToken}: FormProps & FpjsWidgetProps) {
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
          <GetStartedForm formState={formState} onSubmit={onSubmit} errorMessage={errorMessage}/>
        </header>
        <div className={styles.content} style={{ position: 'relative' }}>
          <FpjsWidget endpoint={endpoint} visitorId={visitorId} apiToken={apiToken}/>
        </div>
      </Container>
    </Section>
  )
}
