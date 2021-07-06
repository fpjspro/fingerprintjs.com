import React from 'react'
import Section from '../../../../components/common/Section'
import Container from '../../../common/Container'
import classNames from 'classnames'
import FeatureList from '../../../../components/FeatureList/FeatureList'
import TitledParagraph from '../../../../components/TitledParagraph/TitledParagraph'
import CustomerOverview from '../../../../components/CustomerOverview/CustomerOverview'

import styles from './Summary.module.scss'

export interface Result {
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  title: string
  children: React.ReactNode
}

export interface OverviewBullet {
  value: string
  description: string
}

export interface SummaryProps {
  results: Result[]
  description: string
  bullets: OverviewBullet[]
}
export default function Summary({ results, description, bullets }: SummaryProps) {
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
            <CustomerOverview description={description} bullets={bullets} />
            <FeatureList title='FingerprintJS Features' features={features} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
