import React from 'react'

import classNames from 'classnames'
import { ReactComponent as AccountFraudSvg } from './account_fraud.svg'
import { ReactComponent as PaymentProcessingSvg } from './payment_processing.svg'
import { ReactComponent as ECommerceSvg } from './e_commerce.svg'
import { ReactComponent as CryptoCurrencySvg } from './cryptocurrency.svg'
import { ReactComponent as GamingSvg } from './gaming.svg'
import { ReactComponent as CustomSolutionSvg } from './custom_solution.svg'
import Container from '../common/Container'
import Section from '../common/Section'
import { useMainBackgroundImage } from '../../hooks/useBackgroundImage'
import { Link } from 'gatsby'
import { PATH } from '../../constants/content'

import styles from './UseCasesSection.module.scss'

export default function UseCasesSection() {
  const { mainBackground } = useMainBackgroundImage()

  return (
    <Section className={styles.section} backgroundImageFluid={mainBackground}>
      <Container>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            FingerprintJS
            <br />
            <strong>Use Cases</strong>
          </h2>
        </header>
        <div className={styles.content}>
          <div className={styles.useCases}>
            <div className={classNames(styles.useCase, styles.large)}>
              <div className={styles.iconContainer}>
                <AccountFraudSvg className={styles.icon} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.title}>Account Fraud</h3>
                <p className={styles.description}>
                  Confirm that every visitor on your website is real and not an advanced bot using multiple techniques
                  to create fake accounts.
                  <br />
                  <br />
                  You can mitigate account takeover attempts, prevent password sharing and significantly reduce the
                  number of fake accounts.
                </p>
              </div>
            </div>
            <div className={classNames(styles.useCase, styles.large)}>
              <div className={styles.iconContainer}>
                <PaymentProcessingSvg className={styles.icon} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.title}>Payment Processing</h3>
                <p className={styles.description}>
                  Identify anonymous visitors behind every transaction. Instantly recognize repeated card testing
                  activity and link it to specific users.
                  <br />
                  <br />
                  Significantly reduce chargebacks and fraudulent payments just one month after integrating
                  FingerprintJS on your website.
                </p>
              </div>
            </div>
            <Link to={PATH.ecommerce} className={styles.useCase}>
              <div className={styles.iconContainer}>
                <ECommerceSvg className={styles.icon} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.title}>E-Commerce</h3>
                <p className={styles.description}>
                  Every fraudulent order is money directly out of your pocket. With our best in class tools you can stop
                  malicious users before they cost you real money.
                </p>
              </div>
            </Link>
            <div className={styles.useCase}>
              <div className={styles.iconContainer}>
                <CryptoCurrencySvg className={styles.icon} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.title}>Cryptocurrency</h3>
                <p className={styles.description}>
                  Ensure that your trading, exchange and transfer operations are safe from malicious activity or account
                  fraud.
                </p>
              </div>
            </div>
            <div className={styles.useCase}>
              <div className={styles.iconContainer}>
                <GamingSvg className={styles.icon} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.title}>Gaming</h3>
                <p className={styles.description}>
                  Catch users trying to break your system via multiple accounts, devices, and IP addresses to unjustly
                  enrich themselves.
                </p>
              </div>
            </div>
            <div className={styles.useCase}>
              <div className={styles.iconContainer}>
                <CustomSolutionSvg className={styles.icon} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.title}>Custom Solution</h3>
                <p className={styles.description}>We can build a custom solution that works for your industry.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
