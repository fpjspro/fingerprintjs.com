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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas luctus tortor a magna eleifend, non venenatis
        sapien convallis.
      </>
    ),
  },
  {
    question: 'How does FingerprintJS work?',
    answer: (
      <>
        A browser fingerprint is a set of information related to a user&apos;s device from the hardware to the operating
        system to the browser and its configuration.
      </>
    ),
  },
  {
    question: 'Is FingerprintJS a fit for my business?',
    answer: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas luctus tortor a magna eleifend, non venenatis
        sapien convallis.
      </>
    ),
  },
  {
    question: 'Which pricing plan is the best for me?',
    answer: (
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas luctus tortor a magna eleifend, non venenatis
        sapien convallis.
      </>
    ),
  },
]
