import React, { useState } from 'react'
import { LayoutTemplate } from '../../../components/Layout'
import { useLocation } from '@reach/router'
import useSiteMetadata from '../../../hooks/useSiteMetadata'
import Section from '../../../components/common/Section'
import Container from '../../../components/common/Container'
import SubHeaderComponent from '../../../components/widgets/SubHeader'
import { ReactComponent as Coupon } from './coupon.svg'
import { ReactComponent as BusinessAndFinance } from './business-and-finance.svg'
import { ReactComponent as EasyToUse } from './easy-to-use.svg'
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

import styles from './promo-abuse.module.scss'

interface CaseStudyPageProps {
  pageContext: GeneratedPageContext
}
export default function CaseStudyPage({ pageContext }: CaseStudyPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'Prevent Promotion Abuse at Live Events - A Case Study | FingerprintJS',
    description:
      'Learn how a major food and beverage brand stopped promo abuse at live events while making the redemption process even easier.',
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
            text: 'How a top 100 global consumer brand solved promotion fraud',
            size: 'large',
            weight: 'primary',
          }}
          align='left'
          className={styles.header}
        />

        <div className={styles.subHeader}>
          <p className={styles.description}>
            A major consumer brand built a state-of-the-art web portal for redeeming promotional items using
            FingerprintJS Pro. Their solution was able to maintain low levels of promotion fraud at events without
            requiring a cumbersome login process.
          </p>
          <Button href={'/pdf/case-study/promo-abuse.pdf'} variant='faded' className={styles.downloadPdf} download>
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
      icon: Coupon,
      title: 'Discouraged promotion abuse',
      children: (
        <p className={styles.result}>
          With FingerprintJS’ visitor identification, the web portal successfully stopped visitors from redeeming
          multiple offers at live event booths.
        </p>
      ),
    },
    {
      icon: BusinessAndFinance,
      title: 'Improved conversion rates',
      children: (
        <>
          <p className={styles.result}>
            By not requiring a username and password and instead validating promotion redeemers with FingerprintJS,
            participants redeemed more offers.
          </p>
        </>
      ),
    },
    {
      icon: EasyToUse,
      title: 'Easy to install for a unique use case',
      children: (
        <p className={styles.result}>
          FingerprintJS Pro’s un-opinionated visitor identification solution made it easy for the developer team to add
          visitor identification where it was needed while saving time configuring complicated rules engines.
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
              description='FingerprintJS began working with a consumer brand looking to develop a promotion redemption process for trade shows and sponsored events.'
              bullets={[
                { value: 'Sector:', description: 'Food Manufacturing' },
                { value: 'Use Case:', description: 'Promotion Abuse' },
                { value: 'Employees:', description: '10,000+' },
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
              <h3>Maximizing the impact of promo items at live events was a priority</h3>
              <p>
                As product supply is always a limiting factor at events, the company wanted to design a system to ensure
                that visitors to booths at sponsored events receive only one free item each. The validation process
                needed to be quick and easy to use as to not discourage visitors from interacting and receiving a free
                gift.
              </p>

              <h3>The company also needed to reduce friction to redeem offers at the booth</h3>
              <p>
                The initial design was a web portal where participants can register and log in with a username and
                password to receive a redemption code, which could be displayed to a company employee. However, the
                design required a lot of input from the participant, and the conversion rates on the login screen were
                low. The company wanted to include an easier option that could identify a visitor by their browser or
                device without requiring a login process.
              </p>

              <h2>Why FingerprintJS</h2>
              <p>
                The company came across FingerprintJS when investigating solutions for device identification. They
                started with a pilot of the open source product, and eventually upgraded to a Pro account for CNAME
                integration and increased accuracy.
              </p>

              <h3>Successful pilot that discouraged abuse and increased conversion rates</h3>
              <p>
                The company opted to pilot FingerprintJS as an alternative validation method to the login process that
                would only run if visitors explicitly selected the FingerprintJS option. They found that a large number
                of visitors chose this simpler method to receive their free promotional item, significantly increasing
                the offer conversion rate.
              </p>
              <p>
                They also found that the accuracy of FingerprintJS Pro to be sufficiently high for their use case -
                visitors were successfully deterred from trying to redeem multiple promotions, and legitimate visitors
                were able to be validated quickly even from mobile networks.
              </p>

              <h3>Superior performance and ease-of-use</h3>
              <p>
                The company had used multiple device identification services in the past. Many of these tools utilize
                complicated rules engines that make setup and calibration difficult, and require their signals to be
                used in a prescribed way. FingerprintJS Pro’s API and webhooks are designed for developer teams to
                seamlessly integrate visitor identification into existing products wherever it is needed, allowing their
                team to quickly define validation logic for the brand’s specific use case.
              </p>
              <p>
                The company was also able to pilot FingerprintJS for free, whereas other competing anti-fraud services
                require a large upfront investment to begin testing their solutions.
              </p>

              <h3>Strong company trajectory and vision</h3>
              <p>
                The company wanted to use an anti-fraud provider that had measurable traction and was likely to be an
                industry leader for years to come.
              </p>
              <p>
                FingerprintJS Pro is a venture-backed startup with over $12M raised and is built using core technology
                from the most popular open source browser fingerprinting library. After receiving a recommendation for
                FingerprintJS from a consulting firm and their own internal investigation, the company felt confident in
                FingerprintJS’ product and company trajectory.
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
            name: 'Create Free Account',
            action: URL.signupUrl,
          }}
          secondaryAction={{
            label: 'Talk to us',
            name: 'Contact Sales',
            action: () => setIsContactSalesModalOpen(true),
          }}
          subtitle='FingerprintJS is proud to work with many major brands to deliver state-of-the-art anti-fraud solutions. Have questions for us? Reach out to learn more about how we can help, or sign up for a free FingerprintJS Pro account today.'
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

interface ReferenceListProps {
  references: Array<{ name: string; href?: string }>
}
// TODO [VL] Change this to a widget when integrating the page with the CMS.
export function ReferenceList({ references }: ReferenceListProps) {
  return (
    <Container size='large' className={styles.container}>
      <ol className={styles.referenceList}>
        {references.map(({ name, href }, index) => (
          <li key={name} className={styles.reference}>
            <span>({index + 1})</span>
            {href ? <a href={href}>{name}</a> : <span>{name}</span>}
          </li>
        ))}
      </ol>
    </Container>
  )
}
