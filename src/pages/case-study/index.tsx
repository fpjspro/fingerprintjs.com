import React, { useState } from 'react'
import { LayoutTemplate } from '../../components/Layout'
import { useLocation } from '@reach/router'
import useSiteMetadata from '../../hooks/useSiteMetadata'
import Section from '../../components/common/Section'
import Container from '../../components/common/Container'
import SubHeaderComponent from '../../components/widgets/SubHeader'
import { ReactComponent as BusinessAndFinance } from './business-and-finance.svg'
import { ReactComponent as Loop } from './loop.svg'
import { ReactComponent as Like } from './like.svg'
import InlineCtaComponent from '../../components/widgets/InlineCta'
import classNames from 'classnames'
import CustomerOverview from '../../components/CustomerOverview/CustomerOverview'
import TitledParagraph from '../../components/TitledParagraph/TitledParagraph'
import { Content } from '../../components/Content/Content'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import ContactSalesForm from '../../components/ContactSalesForm'
import { URL } from '../../constants/content'

import styles from './case-study.module.scss'

export default function CaseStudyPage() {
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: `Case Study - FingerprintJS Pro`,
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
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
            text: 'How One Company Solved Account Sharing with FingerprintJS Pro',
            size: 'large',
            weight: 'primary',
          }}
          align='left'
          className={styles.header}
        />

        <div className={styles.subHeader}>
          <p className={styles.description}>
            Using FingerprintJS&apos; browser fingerprinting service, one customer was able to significantly reduce
            account sharing, resulting in an immediate increase in new sign-ups while keeping their legitimate users
            happy.
          </p>
          <Button href={'/pdf/case-study/account-sharing.pdf'} variant='faded' className={styles.downloadPdf} download>
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
      title: 'New revenue from sign-ups',
      children: (
        <p className={styles.result}>
          The company noticed increased revenue within weeks of implementing FingerprintJS Pro from new sign-ups spun
          off from shared accounts.
        </p>
      ),
    },
    {
      icon: Like,
      title: 'No impact to customer success',
      children: (
        <>
          <p className={styles.result}>
            The company maintained the same level of cancellations and customer support calls after implementation,
            clearly demonstrating that there were no significant drawbacks for customers or the business.
          </p>
          <p className={styles.result}>
            Customer satisfaction (CSAT) surveys also remained stable, indicating that additional authentication
            measures were not negatively impacting the user experience.
          </p>
        </>
      ),
    },
    {
      icon: Loop,
      title: 'Feedback loop with FingerprintJS',
      children: (
        <p className={styles.result}>
          The company continues to work closely with the FingerprintJS technical team to adjust algorithms to changes in
          user behavior to maintain high accuracy and a positive student experience.
        </p>
      ),
    },
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
              description="FingerprintJS works with an education technology company that provides a suite of online services. The company's customers are millions of high school and college students in 100+ countries around the world."
              bullets={[
                { value: 'Sector:', description: 'Education' },
                { value: 'Use Case:', description: 'Account Sharing' },
                { value: 'Employees:', description: '1,000+' },
              ]}
            />
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
              <h3>Account sharing a top business priority</h3>
              <p>
                From analyzing login attempts across devices and IP addresses, the company realized that many students
                were sharing their account credentials with friends and classmates and even selling accounts online.
                Account sharing prevention became a top priority in 2020 to stop this fraudulent behavior and recoup
                lost revenue from shared accounts.
              </p>

              <h3>Technical challenges to accurate detection</h3>
              <p>
                The company found that accurately detecting account sharing was a significant technical challenge that
                would require a more accurate identifier than using cookies or IP addresses alone.
              </p>
              <p>Students using the platform often had:</p>
              <ul>
                <li>
                  <strong>Shared IP addresses </strong>
                  (on university campuses or residences)
                </li>
                <li>
                  <strong>Multiple devices to access accounts </strong>
                  (phone, tablet, laptop, and library computers)
                </li>
                <li>
                  <strong>VPNs, Adblockers, or clearing cookies </strong>
                </li>
              </ul>
              <p>
                The customer started building software to prevent account sharing, but it was not accurate enough to
                catch many of their shared accounts and risked disturbing too many legitimate users.
              </p>
              <p>
                The company did not want to build the in-house expertise needed to generate the highest accuracy
                identifiers and instead wanted a provider like FingerprintJS that specialized in visitor identification.
              </p>

              <h2>Why FingerprintJS</h2>
              <p>
                From the company&apos;s investigation, they found that FingerprintJS Pro provided the best solution out
                of all the alternatives they considered for account sharing prevention.
              </p>

              <h3>Higher accuracy vs. cookies, IP addresses, and other device identification services</h3>
              <p>
                FingerprintJS Pro is the most accurate browser fingerprinting service available, with up to 99.5%
                identification accuracy. Instead of relying solely on cookies or IP addresses to flag instances of
                account sharing, FingerprintJS combines an array of 100+ signals that can identify users even when VPNs,
                incognito browsing or other spoofing techniques are used.
              </p>
              <p>
                The company also compared FingerprintJS Pro to a competing device identification service and found that
                the FingerprintJS Pro API caught many additional account sharing instances with a much lower rate of
                false positives.
              </p>

              <h3>Future-proofed account sharing prevention</h3>
              <p>
                To ensure that their solution was effective for years to come, the company found it valuable to partner
                with a team committed to cutting edge identification. As users change their behaviors, browsers change
                their privacy settings and other signals change, the FingerprintJS Pro API is regularly updated to
                provide consistently high identification accuracy.
              </p>

              <h3>GDPR and CCPA compliant</h3>
              <p>
                Due to the company&apos;s philosophy of putting its customers first, it was essential to maintain their
                users&apos; rights to online privacy. FingerprintJS Pro is compliant with GDPR and CCPA for fraud
                detection. All FingerprintJS customers can choose between US and EU hosted data centers to comply with
                their data residency and localization requirements.
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
            name: 'Start 10-Day Trial',
            action: URL.signupUrl,
          }}
          secondaryAction={{
            label: 'Talk to us',
            name: 'Contact Sales',
            action: () => setIsContactSalesModalOpen(true),
          }}
          subtitle='Learn how FingerprintJS Pro can help your business build a custom solution to prevent account sharing and increase revenue.'
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
function ReferenceList({ references }: ReferenceListProps) {
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
