import React from 'react'
import Layout from '../../components/Layout'
import Container from '../../components/common/Container'
import { ReactComponent as AnonymousUserIdentificationSvg } from '../../img/anonymous_user_identification.svg'
import { ReactComponent as ApiAndWebhooksSvg } from '../../img/api_webhooks.svg'
import { ReactComponent as BrowserFingerprintingSvg } from '../../img/browser_fingerprinting.svg'
import { ReactComponent as GeolocationSvg } from '../../img/geolocation.svg'
import { ReactComponent as IncognitoDetectionSvg } from '../../img/incognito_detection.svg'
import Section from '../../components/common/Section'
import DemoCard from './Card'
import { FeatureSection, FAQSection } from './Info'
import SignupSection from './Signup'
import styles from './Demo.module.scss'

export default function DemoPage() {
  return (
    <Layout>
      <Container size='large'>
        <DemoCard />
        <Section className={styles.infoContainer}>
          <FeatureSection features={features} />
          <FAQSection faq={faq} />
        </Section>
      </Container>
      <SignupSection />
    </Layout>
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
        A browser fingerprint is a set of information related to a user's device from the hardware to the operating
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
