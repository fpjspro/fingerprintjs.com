import React, { useState } from 'react'
import { LayoutTemplate } from '../../../components/Layout'
import { useLocation } from '@reach/router'
import useSiteMetadata from '../../../hooks/useSiteMetadata'
import Section from '../../../components/common/Section'
import Container from '../../../components/common/Container'
import SubHeaderComponent from '../../../components/widgets/SubHeader'
import { ReactComponent as Like } from './like.svg'
import { ReactComponent as Support } from './support.svg'
import { ReactComponent as BusinessAndFinance } from './business-and-finance.svg'
import InlineCtaComponent from '../../../components/widgets/InlineCta'
import classNames from 'classnames'
import CustomerOverview from '../../../components/CustomerOverview/CustomerOverview'
import TitledParagraph from '../../../components/TitledParagraph/TitledParagraph'
import { Content } from '../../../components/Content/Content'
import Button from '../../../components/common/Button'
import Modal from '../../../components/common/Modal'
import ContactSalesForm from '../../../components/ContactSalesForm'
import { URL } from '../../../constants/content'
import FeatureList from '../../../components/FeatureList/FeatureList'
import { GeneratedPageContext } from '../../../helpers/types'
import BreadcrumbsSEO from '../../../components/Breadcrumbs/BreadcrumbsSEO'

import styles from './third-party-verification.module.scss'

interface CaseStudyPageProps {
  pageContext: GeneratedPageContext
}
export default function CaseStudyPage({ pageContext }: CaseStudyPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'Third Party Verification - Case Study | FingerprintJS',
    description:
      'Learn how a door-to-door sales software company prevented fraud committed by sales representatives and exceed compliance standards with our 99.5% accurate visitor identification API.',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <Header />
      <Summary />
      <Body />
      <Footer />
    </LayoutTemplate>
  )
}

function Header() {
  return (
    <Section className={styles.section}>
      <Container size='large' className={styles.container}>
        <SubHeaderComponent
          label={{ text: 'Case Study', size: 'medium' }}
          title={{
            text:
              'How one face-to-face sales software company exceeded third-party verification standards with FingerprintJS',
            size: 'large',
            weight: 'primary',
          }}
          align='left'
          className={styles.header}
        />

        <div className={styles.subHeader}>
          <p className={styles.description}>
            The company was able to greatly increase their identity verification accuracy, prevent fraud committed by
            sales representatives, and exceed compliance standards.
          </p>
          <Button
            href={'/pdf/case-study/third-party-verification.pdf'}
            variant='faded'
            className={styles.downloadPdf}
            download
          >
            Download the PDF
          </Button>
        </div>
      </Container>
    </Section>
  )
}

function Summary() {
  const results = [
    {
      icon: BusinessAndFinance,
      title: 'Reduced Fraud by 94%',
      children: (
        <p className={styles.result}>
          One major customer of the company reduced fraudulent sales by 94% with FingerprintJS’ high accuracy mobile
          device identification.
        </p>
      ),
    },
    {
      icon: Support,
      title: 'Seamless integration',
      children: (
        <>
          <p className={styles.result}>
            Using FingerprintJS Pro’s secure API, the company replaced their previous browser fingerprinting solution
            easily without disrupting existing security processes.
          </p>
        </>
      ),
    },
    {
      icon: Like,
      title: 'No disruption to customer experience',
      children: (
        <p className={styles.result}>
          The new visitor identification process reduced fraud without increasing ‘false positives,’ protecting
          customers without causing unnecessary hurdles in the purchasing process.
        </p>
      ),
    },
  ]

  const features = [
    '99.5% Accurate Identification',
    'Browser Fingerprinting',
    'GDPR and CCPA Compliant',
    'Incognito Mode Detection',
    'Geolocation',
  ]

  return (
    <Section className={classNames(styles.section, styles.adjacent)}>
      <Container size='large' className={styles.container}>
        <div className={styles.summaryWrapper}>
          <div>
            <h2 className={styles.summaryTitle}>Results</h2>
            {results.map(({ icon, title, children }) => (
              <TitledParagraph key={title} icon={icon} title={title}>
                {children}
              </TitledParagraph>
            ))}
          </div>

          <div>
            <CustomerOverview
              description='FingerprintJS works with a US-based door-to-door sales platform designed for retail energy sales. The company provides both software and hardware (tablets) for face-to-face sales representatives to manage their lead list and enroll new customers. The software also performs important security and compliance functions for the energy seller by ensuring data collected is accurate, secure, and compliant with state regulations.'
              bullets={[
                { value: 'Sector:', description: 'Energy Sales' },
                { value: 'Use Case:', description: 'Third Party Verification' },
              ]}
            />
            <FeatureList title='FingerprintJS Features' features={features} />
          </div>
        </div>
      </Container>
    </Section>
  )
}

function Body() {
  return (
    <Section className={styles.section}>
      <Container size='large' className={styles.container}>
        <Content
          className={styles.body}
          content={
            <>
              <h2>The problem</h2>
              <p>
                A key feature of the company’s software solution is third-party verification (TPV), which is required by
                law for energy sales in many US states. When sales representatives enroll a new customer, the enrollee
                must confirm the sale was authorized and that they understand the plain-English terms and conditions of
                the sale. The company’s platform streamlines the TPV process by texting the enrollee a link to a
                smartphone-optimized verification platform - a far easier process than competing solutions that require
                a lengthy call with a live agent or a phone recording. To ensure that the confirmation link is sent to a
                legitimate customer and is not filled out by representatives seeking to claim commissions for enrolling
                non-consenting customers, the company wanted a sophisticated identity verification system. Their team
                designed a system with three layers of security:
              </p>
              <ul>
                <li>
                  <strong>Device Verification: </strong>
                  Ensure that the device and phone number that submitted the confirmation form is unique and legitimate
                  using a combination of browser fingerprinting and a VOIP phone number checking service.
                </li>
                <li>
                  <strong>Signature Verification / Biometric Analysis: </strong>
                  Look for anomalies in submitted signatures and behavior on-page.
                </li>
                <li>
                  <strong>Customer Positive ID: </strong>
                  When the AI engine detects suspicious activity, ask the customer information that only they should
                  know and verify against major credit bureaus.
                </li>
              </ul>
              <p>
                When the company approached FingerprintJS, the company was using another open source browser
                fingerprinting library for their device verification layer. The company was looking to increase the
                accuracy of their fingerprinting, particularly on mobile devices, as they believed most instances of
                fraud could be prevented at the device and phone number verification stage.
              </p>

              <h2>Why FingerprintJS</h2>
              <p>
                After investigation, the company found that the FingerprintJS Pro API offered significant advantages to
                their previous fingerprinting solution, resulting in a more secure third-party verification process.
              </p>

              <h3>Higher identification accuracy for mobile devices</h3>
              <p>
                Many browser fingerprinting solutions struggle to accurately identify mobile visitors, as there are not
                enough unique signals to differentiate between users. For the company, reducing false positives was
                crucial to ensuring that legitimate customers could verify their enrollment quickly and easily.
              </p>
              <p>
                For mobile devices, FingerprintJS Pro uses a combination of specialized signals to ensure the highest
                possible accuracy, including:
              </p>
              <ul>
                <li>Mobile network IP addresses analysis </li>
                <li>Mobile specific APIs (e.g. accelerometer) </li>
                <li>Mobile payment vendor information</li>
                <li>Mobile specific GPU signals (e.g. WebGL)</li>
              </ul>
              <p>
                In addition to mobile browser fingerprinting, FingerprintJS Pro utilizes several server-side techniques
                like TLS analysis and SSL fingerprinting to increase the accuracy of visitorIDs, further reducing false
                positives.
              </p>
              <h3>Technical and Flexible Team</h3>
              <p>
                The company’s engineering team worked closely with FingerprintJS to validate performance and optimize
                their installation. As the company had built a sophisticated verification system, it was important that
                their developers had easy access to technical support.
              </p>
              <p>
                FingerprintJS Pro offers chat, email, and by-appointment phone support for all paid plans. As a
                developer-first company, our in-house support team consists of engineers with deep knowledge of our
                product.
              </p>
            </>
          }
        />
      </Container>
    </Section>
  )
}

function Footer() {
  const [isContactSalesModalOpen, setIsContactSalesModalOpen] = useState(false)

  return (
    <>
      <section>
        <InlineCtaComponent
          title='Get in Touch'
          primaryAction={{
            label: 'Get Started Today',
            name: 'Start Free Trial',
            action: URL.signupUrl,
          }}
          secondaryAction={{
            label: 'Talk to us',
            name: 'Contact Sales',
            action: () => setIsContactSalesModalOpen(true),
          }}
          subtitle='Learn how FingerprintJS Pro can help your business build a custom solution to prevent online fraud.'
          size='large'
          className={styles.cta}
        />
      </section>

      <Modal title='Contact Sales' open={isContactSalesModalOpen} onClose={() => setIsContactSalesModalOpen(false)}>
        <ContactSalesForm />
      </Modal>
    </>
  )
}
