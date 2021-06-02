import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import PriceCalculator from '../../components/PriceCalculator'
import Section, { SectionProps } from '../../components/common/Section'
import classNames from 'classnames'
import Container from '../../components/common/Container'
import PricingCard from '../../components/pricing/Card'
import BannerWithCTA from '../../components/BannerWithCTA/BannerWithCTA'
import { URL } from '../../constants/content'
import { useMainBackgroundImage } from '../../hooks/useBackgroundImage'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'
import useSiteMetadata from '../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'

import styles from './Pricing.module.scss'

interface PricingPageProps {
  pageContext: GeneratedPageContext
}
export default function PricingPage({ pageContext }: PricingPageProps) {
  const { mainBackground } = useMainBackgroundImage()
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'Pricing - FingerprintJS Pro',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <CalculatorSection mainBackground={mainBackground} />
      <BannerSection />
      <PricingModelsSection mainBackground={mainBackground} />
    </LayoutTemplate>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  description?: string
  invertOrder?: boolean
}

function SectionHeader({ title, subtitle, description, invertOrder = false }: SectionHeaderProps) {
  return (
    <header className={classNames(styles.header, { [styles.inverted]: invertOrder })}>
      <p className={styles.subtitle}>{subtitle}</p>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </header>
  )
}

function CalculatorSection({ mainBackground }: { mainBackground: SectionProps['backgroundImageFluid'] }) {
  return (
    <Section className={styles.calculator} backgroundImageFluid={mainBackground}>
      <Container>
        <SectionHeader
          title='Calculator'
          subtitle='Pro Pricing'
          description="If you don't know how many unique visitors you need, use monthly active users"
        />
        <PriceCalculator />
      </Container>
    </Section>
  )
}

function PricingModelsSection({ mainBackground }: { mainBackground: SectionProps['backgroundImageFluid'] }) {
  return (
    <Section className={styles.pricing} backgroundImageFluid={mainBackground}>
      <Container>
        <SectionHeader title='Pricing Models' invertOrder />
        <PricingCard
          title='On-Demand'
          description='For on-demand pricing, you pay monthly per unique visitors identified. This plan is recommended for websites with unpredictable or low traffic volumes.'
          sectionClasses={styles.onDemand}
        >
          <ul className={styles.arrowList}>
            <li>
              On-demand is a metered model, where we count your unique visitors and bill you accordingly every month.
            </li>
            <li>
              The minimum paid plan is $100/month, which includes the identification of 5,000 unique visitors per month.
              Unused identifications are not carried over to the next month. Both free and paid plans include unlimited
              API calls.
            </li>
            <li>
              The on-demand plan is recommended when you have a small and/or unpredictable volume and want to pay only
              for what you use every month. You can cancel at any time.
            </li>
            <li>
              If your monthly invoice exceeds $500 due to additional visitor charges, your credit card will be charged
              immediately without waiting for the end of the billing period. This process repeats every time an
              additional usage of $500 is reached.
            </li>
          </ul>
          <div className={styles.priceTable}>
            <div className={classNames(styles.row, styles.header)}>
              <div className={styles.column}>Monthly Unique Visitors</div>
              <div className={styles.column}>Price</div>
            </div>
            <div className={styles.row}>
              <div className={styles.column}>&lt; 1K</div>
              <div className={styles.column}>$0/month</div>
            </div>
            <div className={styles.row}>
              <div className={styles.column}>1K - 5K</div>
              <div className={styles.column}>Flat fee of $100/month</div>
            </div>
            <div className={styles.row}>
              <div className={styles.column}>&gt; 5K</div>
              <div className={styles.column}>$0.02 per unique visitor</div>
            </div>
          </div>
        </PricingCard>
        <PricingCard
          title='Annual'
          description='Our 1 year prepaid plan has several advantages compared to the on-demand model.'
          sectionClasses={styles.annual}
        >
          <ul className={classNames(styles.numberList, styles.horizontal)}>
            <li>You lock in your price for 1 year and get a 20% discount.</li>
            <li>Unused unique visitor identifications are carried over from month to month</li>
          </ul>
          <div className={styles.quote}>
            An annual plan is recommended when you have a high and/or predictable volume and getting a significant
            discount for your usage is important.
          </div>
        </PricingCard>
      </Container>
    </Section>
  )
}

function BannerSection() {
  return (
    <Section className={styles.bannerSection}>
      <Container>
        <BannerWithCTA title='New To FingerprintJS Pro?' ctaText='Try For Free' ctaHref={URL.signupUrl}>
          New accounts get unlimited identifications for the first 30 days. After 30 days, accounts can remain on a free
          plan with up to 1,000 unique visitor identifications per month, or upgrade to a paid plan for more
          identifications. All plans include unlimited API calls.
        </BannerWithCTA>
      </Container>
    </Section>
  )
}
