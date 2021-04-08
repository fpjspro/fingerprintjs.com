import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import classNames from 'classnames'

import styles from './featureComparisonSection.module.scss'

export default function featureComparisonSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container} size='small'>
        <h1 className={styles.title}>Feature Comparison</h1>
        <table className={styles.table}>
          <tr className={styles.optionColumns}>
            <th />
            <th>
              <h3>Open Source</h3>
            </th>
            <th className={styles.proRow}>
              <h3>Pro</h3>
            </th>
          </tr>
          <FeatureTitle title='Core Features' />
          <Feature feature='100% Open-source' oss='yes' pro='no*' />
          <Feature
            feature='Standard fingerprint signals'
            description='screen, os, device name'
            oss='✓'
            pro='✓'
            isSymbol
          />
          <Feature feature='Advanced fingerprint signals' description='canvas, audio, fonts' oss='✓' pro='✓' isSymbol />
          <Feature feature='ID type' oss='fingerprint' pro='visitorID**' />
          <Feature feature='ID lifetime' oss='several weeks' pro='months/years' />
          <Feature feature='ID origin' oss='client' pro='server' />
          <Feature feature='ID collisions' oss='common' pro='rare' />
          <FeatureTitle title='Additional features' />
          <Feature
            feature='Incognito mode detection'
            description='works in all modern browsers - see our full list of browsers supported'
            oss='-'
            pro='✓'
            isSymbol
          />
          <Feature
            feature='Server-side accuracy increase'
            description='based on additional server-side signals, such as TLS crypto support, ipv4/v6 data and others'
            oss='-'
            pro='✓'
            isSymbol
          />
          <Feature
            feature='Query API & realtime Webhooks'
            description='build flexible workflows'
            oss='-'
            pro='✓'
            isSymbol
          />
          <Feature feature='Geolocation' description='based on IP address' oss='-' pro='✓' isSymbol />
          <FeatureTitle title='Operations' />
          <Feature feature='Data security' oss='Your infrastructure' pro='Encrypted at rest' />
          <Feature feature='Storage' oss='Your infrastructure' pro='Unlimited up to 1 yr' />
          <Feature feature='Regions' oss='Your infrastructure' pro='99.99% Uptime' />
          <Feature feature='Compliance' oss='Your infrastructure' pro='GDPR, CCPA compliant***' />
          <Feature feature='SLA' oss='No SLA' pro='99.99% Uptime' />
          <Feature
            feature='Support'
            oss='GitHub community'
            pro='Support team via email, chat, and call-back within 1 business day'
          />
        </table>
      </Container>
    </Section>
  )
}

interface FeatureTitleProps {
  title: string
}
function FeatureTitle({ title }: FeatureTitleProps) {
  return (
    <>
      <tr>
        <td className={styles.featureTitleColumn}>{title}</td>
        <td />
        <td />
      </tr>
    </>
  )
}

interface FeatureProps {
  feature: string
  description?: string
  oss: string
  pro: string
  isSymbol?: boolean
}
function Feature({ feature, description, oss, pro, isSymbol }: FeatureProps) {
  return (
    <>
      <tr>
        <td className={styles.featureColumn}>
          <strong>{feature}</strong>
          {description && <div className={styles.description}>{description}</div>}
        </td>
        <td className={classNames(styles.versionColumn, { [styles.versionColumnStrong]: isSymbol })}>{oss}</td>
        <td className={classNames(styles.versionColumn, { [styles.versionColumnStrong]: isSymbol })}>{pro}</td>
      </tr>
    </>
  )
}
