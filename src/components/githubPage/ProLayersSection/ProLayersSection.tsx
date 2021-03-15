import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import proLayers from './proLayers.png'

import styles from './ProLayersSection.module.scss'

export default function ProLayersSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Pro is Powered By Open Source</h1>
          <h2 className={styles.subtitle}>
            FingerprintJS Pro introduces server-side identification techniques, deduplication analysis, and machine
            learning to generate stable and highly accurate visitorIDs for every web visitor.
          </h2>
        </header>
        <img alt='FingerprintJS Pro layers' src={proLayers} className={styles.image} />
      </Container>
    </Section>
  )
}
