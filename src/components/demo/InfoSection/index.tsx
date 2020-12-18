import React from 'react'
import classNames from 'classnames'
import Collapsible from '../../../components/common/Collapsible'
import Container from '../../../components/common/Container'
import { ReactComponent as AnonymousUserIdentificationSvg } from '../../../img/anonymous_user_identification.svg'
import { ReactComponent as ApiAndWebhooksSvg } from '../../../img/api_webhooks.svg'
import { ReactComponent as BrowserFingerprintingSvg } from '../../../img/browser_fingerprinting.svg'
import { ReactComponent as GeolocationSvg } from '../../../img/geolocation.svg'
import { ReactComponent as IncognitoDetectionSvg } from '../../../img/incognito_detection.svg'
import Section from '../../../components/common/Section'
import styles from './InfoSection.module.scss'
import { Link } from 'gatsby'
import { PATH, URL } from '../../../constants/content'

interface FeaturesBlockProps {
  features: { icon: React.ReactNode; title: string }[]
}

export default function InfoSection() {
  return (
    <Section className={styles.infoSection}>
      <Container size='large' className={styles.infoContainer}>
        <FeaturesBlock features={features} />
        <FAQBlock faq={faq} />
      </Container>
    </Section>
  )
}

export function FeaturesBlock({ features }: FeaturesBlockProps) {
  return (
    <div className={classNames(styles.block, styles.feature)}>
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

interface FAQBlockProps {
  faq: { question: string; answer: React.ReactNode }[]
}

export function FAQBlock({ faq }: FAQBlockProps) {
  return (
    <div className={classNames(styles.block, styles.faq)}>
      <header className={styles.header}>
        <h2 className={styles.title}>Frequently Asked Questions</h2>
        {/* <Link to={''} className={styles.link}>
          See&nbsp;all&nbsp;&gt;
        </Link> */}
      </header>

      <div>
        <Collapsible sections={faq.map((entry) => ({ title: entry.question, content: entry.answer }))} />
      </div>
    </div>
  )
}

const features = [
  { icon: <BrowserFingerprintingSvg className={styles.icon} />, title: 'Browser Fingerprinting' },
  { icon: <GeolocationSvg className={styles.icon} />, title: 'Geolocation' },
  { icon: <AnonymousUserIdentificationSvg className={styles.icon} />, title: 'Anonymous User Identification' },
  { icon: <IncognitoDetectionSvg className={styles.icon} />, title: 'Incognito Mode Detection' },
  { icon: <ApiAndWebhooksSvg className={styles.icon} />, title: 'API & Webhooks' },
]

const faq = [
  {
    question: 'What is FingerprintJS?',
    answer: (
      <>
        FingerprintJS is a 99.5% accurate browser fingerprinting service used to uniquely identify visitors and
        associate sessions in order to identify fraudulent actors on your website. The technology works by analyzing
        data passed by the visitor&apos;s browser, device, patterns of use and more to generate a unique visitorID,
        which can be used to associate patterns of fraud with specific visitors.
        <br />
        <br />
        As opposed to enterprise-focused fraud prevention platforms, FingerprintJS was designed to solve digital fraud
        by empowering technical teams to build fraud prevention into their applications with our API, webhooks, and
        unparalleled identification accuracy. <br />
        <br />
        You can try FingerprintJS Pro with all features and no usage limits for 10 days. Simply{' '}
        <a href={URL.signupUrl} className={styles.link}>
          sign up for our trial
        </a>
        , install our Javascript snippet on your website, and begin collecting unique VisitorIDs, geolocation data and
        more immediately.
      </>
    ),
  },
  {
    question: 'How does FingerprintJS work?',
    answer: (
      <>
        FingerprintJS is built with our open source browser fingerprinting library and made more accurate with
        additional identification measures, machine learning algorithms and a probability engine to generate 99.5%
        accurate visitorIDs for traffic to your website. <br />
        <br />
        Browser fingerprinting is the backbone of many major fraud detection solutions. Fingerprinting can identify
        unique visitors and associate sessions through incognito browsing, VPNs, cookie blockers and other technologies
        used to anonymize fraudulent actors online. The technology works by analyzing data passed by the visitor&apos;s
        browser, device, patterns of use and more to generate a unique fingerprint, which can be used to associate
        patterns of fraud. <br />
        <br />
        In addition to browser fingerprinting, FingerprintJS Pro&apos;s server-side API processes and analyzes vast
        amounts of data, searching for patterns and re-occurrences of fraudulent activity, and associates fingerprints
        that are likely the same user together under the visitorID identifier.
      </>
    ),
  },
  {
    question: 'Is FingerprintJS GDPR compliant?',
    answer: (
      <>
        Yes - FingerprintJS is GDPR compliant.
        <ul className={styles.bulletList}>
          <li>
            Our technology is intended to be used for fraud detection only - for this use case, no user consent is
            required
          </li>
          <li>Any use outside of fraud detection would need to comply with GDPR user consent rules</li>
          <li>
            We never automatically track traffic - our customers can configure under what conditions visitors are
            tracked
          </li>
          <li>We never do cross-domain tracking</li>
        </ul>
      </>
    ),
  },
  {
    question: 'Which pricing plan is the best for me?',
    answer: (
      <>
        FingerprintJS costs $100/month for the first 100,000 API calls, and $1 per 1,000 API calls after that. Please
        see our{' '}
        <Link to={PATH.pricingUrl} className={styles.link}>
          pricing
        </Link>{' '}
        page for full details.
      </>
    ),
  },
]
