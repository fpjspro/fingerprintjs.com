import React from 'react'
import Section from '../../../../components/common/Section'
import Container from '../../../common/Container'
import FeatureList from '../../../../components/FeatureList/FeatureList'
import TitledParagraph from '../../../../components/TitledParagraph/TitledParagraph'
import CustomerOverview from '../../../../components/CustomerOverview/CustomerOverview'
import { ImageInfo } from '../../../common/PreviewCompatibleImage/PreviewCompatibleImage'

import styles from './Summary.module.scss'

export interface Result {
  icon?: ImageInfo
  iconAlt?: string
  iconTitle?: string
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
    <Section className={styles.section}>
      <Container size='large' className={styles.container}>
        <div className={styles.wrapper}>
          <div>
            <h2 className={styles.title}>Results</h2>
            {results.map(({ icon, iconAlt, iconTitle, title, children }) => (
              <TitledParagraph
                key={title}
                icon={icon}
                title={title}
                iconAlt={iconAlt}
                iconTitle={iconTitle}
                className={styles.result}
              >
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
