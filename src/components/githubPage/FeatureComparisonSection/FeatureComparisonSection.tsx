import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { URL, DOC_URL } from '../../../constants/content'
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
          <Feature feature='Standard fingerprint signals' oss='✓' pro='✓' isSymbol>
            screen, os, device name
          </Feature>
          <Feature feature='Advanced fingerprint signals' oss='✓' pro='✓' isSymbol>
            canvas, audio, fonts
          </Feature>
          <Feature feature='ID type' oss='fingerprint' pro='visitorID**' />
          <Feature feature='ID lifetime' oss='several weeks' pro='months/years' />
          <Feature feature='ID origin' oss='client' pro='server' />
          <Feature feature='ID collisions' oss='common' pro='rare' />
          <FeatureTitle title='Additional features' />
          <Feature feature='Incognito mode detection' oss='-' pro='✓' isSymbol>
            works in all modern browsers - see our full list of{' '}
            <a href={DOC_URL.browserSupportUrl} target='_blank' rel='noreferrer' className={styles.link}>
              browsers supported
            </a>
          </Feature>
          <Feature feature='Server-side accuracy increase' oss='-' pro='✓' isSymbol>
            based on additional server-side signals, such as TLS crypto support, ipv4/v6 data and others
          </Feature>
          <Feature feature='Query API & realtime Webhooks' oss='-' pro='✓' isSymbol>
            build flexible workflows
          </Feature>
          <Feature feature='Geolocation' oss='-' pro='✓' isSymbol>
            based on IP address
          </Feature>
          <FeatureTitle title='Operations' />
          <Feature feature='Data security' oss='Your infrastructure' pro='Encrypted at rest' />
          <Feature feature='Storage' oss='Your infrastructure' pro='Unlimited up to 1 yr' />
          <Feature feature='Regions' oss='Your infrastructure' pro='99.9% Uptime' />
          <Feature feature='Compliance' oss='Your infrastructure' pro='GDPR, CCPA compliant***' />
          <Feature feature='SLA' oss='No SLA' pro='99.9% Uptime' />
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
                Create Account
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
  children?: React.ReactNode
  oss: string
  pro: string
  isSymbol?: boolean
}
function Feature({ feature, children, oss, pro, isSymbol }: FeatureProps) {
  return (
    <>
      <tr>
        <td className={styles.featureColumn}>
          <strong>{feature}</strong>
          {children && <div className={styles.description}>{children}</div>}
        </td>
        <td className={classNames(styles.versionColumn, { [styles.versionColumnStrong]: isSymbol })}>{oss}</td>
        <td className={classNames(styles.versionColumn, { [styles.versionColumnStrong]: isSymbol })}>{pro}</td>
      </tr>
    </>
  )
}
