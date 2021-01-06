import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import PriceCalculator from '../../components/PriceCalculator'
import Section, { SectionProps } from '../../components/common/Section'
import classNames from 'classnames'
import Container from '../../components/common/Container'
import PricingCard from '../../components/pricing/Card'
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
    url: `${siteMetadata.url}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <CalculatorSection mainBackground={mainBackground} />
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
          description="If you don't know how many identifications you need, use monthly user sessions"
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
        <SectionHeader title='Pricing Models' subtitle='We support 2 models of pricing' invertOrder />
        <PricingCard
          title='On-Demand'
          description='For on-demand pricing, you pay monthly per API call. This plan is recommended for users with unpredictable or low traffic volumes.'
          sectionClasses={styles.onDemand}
        >
          <ul className={styles.arrowList}>
            <li>On-demand is a metered model, where we count your API calls and bill you accordingly every month.</li>
            <li>
              The on-demand plan is recommended when you have a small and/or unpredictable volume and want to pay only
              for what you use every month. You can cancel at any time.
            </li>
            <li>
              The minimum plan is $100/month, which includes 100,000 identifications per month. Unused API calls are not
              carried over to the next month.
            </li>
          </ul>
          <div className={styles.priceTable}>
            <div className={classNames(styles.row, styles.header)}>
              <div className={styles.column}>Monthly API Call</div>
              <div className={styles.column}>Price</div>
            </div>
            <div className={styles.row}>
              <div className={styles.column}>0 - 100K</div>
              <div className={styles.column}>Flat fee of $100/month</div>
            </div>
            <div className={styles.row}>
              <div className={styles.column}>&gt; 100K</div>
              <div className={styles.column}>$1 per 1,000 API calls</div>
            </div>
          </div>
        </PricingCard>
        <PricingCard
          title='Reserved'
          description='Reserved is a 1 year prepaid plan that has several advantages compared to the on-demand model.'
          sectionClasses={styles.reserved}
        >
          <ul className={classNames(styles.numberList, styles.horizontal)}>
            <li>You lock in your price for 1 year and get a 20% discount.</li>
            <li>Unused API calls are carried over from month to month</li>
          </ul>
          <div className={styles.quote}>
            A reserved plan is recommended when you have a high and/or predictable volume and getting a significant
            discount for your usage is important.
          </div>
        </PricingCard>
      </Container>
    </Section>
  )
}
