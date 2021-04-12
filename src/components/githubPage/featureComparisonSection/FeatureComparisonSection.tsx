import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { URL } from '../../../constants/content'
import classNames from 'classnames'

import styles from './FeatureComparisonSection.module.scss'

export default function FeatureComparisonSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container}>
        <h1 className={styles.title}>Feature Comparison</h1>
        <table className={styles.table}>
          <tr className={styles.optionColumns}>
            <th />
            <th>
              <h3 className={styles.version}>Open Source</h3>
            </th>
            <th className={styles.proRow}>
              <h3 className={styles.version}>Pro</h3>
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
          <tr className={styles.buttonsColumns}>
            <th />
            <th>
              <Button href={URL.githubRepoUrl} variant='outline' className={styles.button}>
                Access on GitHub
              </Button>
            </th>
            <th className={styles.ButtonRow}>
              <Button href={URL.signupUrl} variant='primary' className={styles.button}>
                Start Trial
              </Button>
            </th>
          </tr>
        </table>
        <footer className={styles.footer}>
          <p className={styles.note}>
            *Pro uses the open source fingerprinting library as well as proprietary technology for increased accuracy
            and stability.
          </p>
          <p className={styles.note}>
            ** VisitorIDs, in comparison to fingerprints, include server side techniques, are deduplicated and utilize
            fuzzy matching to result in a more accurate and stable identifier. Fingerprint hashes rely on an exact match
            across all browser attrributes, making them unstable across &gt; 2 week time intervals.
          </p>
          <p className={styles.note}>
            *** FingerprintJS is GDPR and CCPA compliant as the data processor. You still need to be compliant as the
            data controller and use the identification for fraud under legitimate interest or ask for user consent.
          </p>
        </footer>
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
