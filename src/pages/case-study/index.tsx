import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import { useLocation } from '@reach/router'
import useSiteMetadata from '../../hooks/useSiteMetadata'
import Section from '../../components/common/Section'
import Container from '../../components/common/Container'
import SubHeaderComponent from '../../components/widgets/SubHeader'
import { ReactComponent as FirstPlaceholderSvg } from '../../img/geolocation.svg'
import { ReactComponent as SecondPlaceholderSvg } from '../../img/bot_detection.svg'
import { ReactComponent as ThirdPlaceholderSvg } from '../../img/browser_fingerprinting.svg'
import InlineCtaComponent from '../../components/widgets/InlineCta'
import BlockQuote from '../../components/BlockQuote/BlockQuote'
import classNames from 'classnames'
import companyLogo from '../../img/logo.svg'
import CustomerOverview from '../../components/CustomerOverview/CustomerOverview'
import TitledParagraph from '../../components/TitledParagraph/TitledParagraph'
import { Content } from '../../components/Content/Content'

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
      <div className={styles.titleWrapper}>
        <Container>
          <SubHeaderComponent
            title='Case Study'
            titleSize='medium'
            subtitle='How Chegg Solved Account Sharing with FingerprintJS Pro'
            subtitleSize='large'
            subtitleWeight='primary'
            align='left'
          />
        </Container>
      </div>

      <div className={styles.descriptionWrapper}>
        <Container>
          <p className={styles.description}>
            Using FingerprintJS&apos; browser fingerprinting service, Chegg was able to significantly reduce account
            sharing, resulting in an immediate increase in new sign-ups while keeping their legitimate users happy.
          </p>
        </Container>
      </div>
    </Section>
  )
}

function Summary() {
  const results = [
    {
      icon: FirstPlaceholderSvg,
      title: 'New revenue from sign-ups',
      children: (
        <>
          <p className={styles.result}>
            Chegg noticed increased revenue within weeks of implementing FingerprintJS Pro from new sign-ups spun off
            from shared accounts.
          </p>
          <BlockQuote author='Dan Rosensweig, CEO, during Q3 earnings call (1)'>
            There were people sharing accounts, and when we proved that, we saw our (subscriber) growth rates in the
            first quarter move up to 32%... and then you see we’re at 64% now.
          </BlockQuote>
        </>
      ),
    },
    {
      icon: SecondPlaceholderSvg,
      title: 'No impact to customer success',
      children: (
        <p className={styles.result}>
          Chegg maintained the same level of cancellations and customer support calls after implementation, clearly
          demonstrating that there were no significant drawbacks for customers or the business.
        </p>
      ),
    },
    {
      icon: ThirdPlaceholderSvg,
      title: 'FingerprintJS feedback loop',
      children: (
        <p className={styles.result}>
          Chegg continues to work closely with the FingerprintJS technical team to adjust algorithms to changes in user
          behavior to maintain high accuracy and a positive student experience.
        </p>
      ),
    },
  ]

  return (
    <Section className={classNames(styles.section, styles.summaryWrapper)}>
      <Container className={styles.summary}>
        <div>
          <h3 className={styles.summaryTitle}>Results</h3>
          {results.map(({ icon, title, children }) => (
            <TitledParagraph key={title} icon={icon} title={title}>
              {children}
            </TitledParagraph>
          ))}
        </div>

        <div>
          <CustomerOverview
            logo={companyLogo}
            description='Chegg is an education company that provides a suite of services including digital and physical textbooks, homework solutions, tutoring, and internship placement.'
            bullets={[
              { value: '3.7', description: 'Million Students' },
              { value: '190', description: 'Countries' },
              { value: '#275', description: 'Global site rank (2)' },
            ]}
          />
          <BlockQuote author='Augie Kennady, Manager of Consumer Operations & Analytics'>
            FingerPrintJS helped us solve our account sharing problem in a manner that was both datadriven and, most
            importantly, Student First!
          </BlockQuote>
        </div>
      </Container>
    </Section>
  )
}

function Body() {
  return (
    <Section className={styles.section}>
      <Container className={styles.body}>
        <Content
          content={
            <>
              <h2>The problem</h2>
              <BlockQuote author='Andy Brown, CFO, during investor call (3)'>
                I don’t think we comprehended, as a company, how big account sharing has been...
              </BlockQuote>

              <h3>Account sharing a top business priority</h3>
              <p>
                From analyzing login attempts across devices and IP addresses, Chegg realized that many students were
                sharing their account credentials with friends and classmates and even selling accounts online. Account
                sharing prevention became a top priority in 2020 to stop this fraudulent behavior and recoup lost
                revenue from shared accounts.
              </p>

              <h3>Technical challenges to accurate detection</h3>
              <p>
                Chegg found that accurately detecting account sharing was a significant technical challenge that would
                require a more accurate identifier than using cookies or IP addresses alone.
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
                Chegg started building software to prevent account sharing, but it was not accurate enough to catch many
                of their shared accounts and risked disturbing too many legitimate users.
              </p>
              <p>
                Chegg did not want to build the in-house expertise needed to generate the highest accuracy identifiers
                and instead wanted a provider like FingerprintJS that specialized in visitor identification.
              </p>

              <h2>Why FingerprintJS</h2>
              <p>
                From Chegg&apos;s investigation, they found that FingerprintJS Pro provided the best solution out of all
                the alternatives they considered for account sharing prevention.
              </p>

              <h3>Higher accuracy vs. cookies, IP addresses, and other device identification services</h3>
              <p>
                FingerprintJS Pro is the most accurate browser fingerprinting service available, with up to 99.5%
                identification accuracy. Instead of relying solely on cookies or IP addresses to flag instances of
                account sharing, FingerprintJS combines an array of 100+ signals that can identify users even when VPNs,
                incognito browsing or other spoofing techniques are used.
              </p>
              <p>
                Chegg also compared FingerprintJS Pro to a competing device identification service and found that the
                FingerprintJS Pro API caught many additional account sharing instances with a much lower rate of false
                positives.
              </p>

              <h3>Future-proofed account sharing prevention</h3>
              <p>
                To ensure that their solution was effective for years to come, Chegg found it valuable to partner with a
                team committed to cutting edge identification. As users change their behaviors, browsers change their
                privacy settings and other signals change, the FingerprintJS Pro API is regularly updated to provide
                consistently high identification accuracy.
              </p>

              <h3>GDPR and CCPA compliant</h3>
              <p>
                Due to Chegg&apos;s &apos;Student First&apos; philosophy, it was essential to maintain their users&apos;
                rights to online privacy. FingerprintJS Pro is fully compliant with GDPR and CCPA for fraud detection.
                All FingerprintJS customers can also choose between US and EU hosted data centers to comply with their
                data residency and localization requirements.
              </p>
            </>
          }
        />
      </Container>
    </Section>
  )
}

function Footer() {
  const references = [
    {
      name: 'Chegg Q3 earnings call - Oct. 26 2020',
      href:
        'https://seekingalpha.com/article/4381484-chegg-inc-chgg-ceo-dan-rosensweig-on-q3-2020-results-earnings-call-transcript',
    },
    {
      name: 'Alexa ranking for global internet engagement - Jan. 7 2020',
      href: 'https://www.alexa.com/siteinfo/chegg.com',
    },
    { name: 'Jeffries Virtual Consumer Conference - Jun. 24 2020' },
  ]

  return (
    <footer>
      <ReferenceList references={references} />

      <InlineCtaComponent
        title='Get in Touch'
        subtitle='Learn how FingerprintJS Pro can help your business build a custom solution to prevent account sharing and increase revenue.'
        primaryAction='Get Started Today'
        buttonText='Start 10-Day Trial'
        buttonHref='/'
        secondaryAction='Contact Sales'
        secondaryLink='sales@fingerprintjs.com'
        secondaryHref='mailto:sales@fingerprintjs.com'
        size='regular'
      />
    </footer>
  )
}

interface ReferenceListProps {
  references: Array<{ name: string; href?: string }>
}
function ReferenceList({ references }: ReferenceListProps) {
  return (
    <Container>
      <ol>
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
