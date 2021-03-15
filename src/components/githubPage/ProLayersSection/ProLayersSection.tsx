import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import proLayers from './proLayersArrows.png'

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
        <div className={styles.wrapper}>
          <div className={styles.imageWrapper}>
            <div className={styles.aside}>
              <div>Runs on server</div>
              <div>Runs in browser</div>
            </div>
            <img alt='FingerprintJS Pro layers' src={proLayers} className={styles.image} />
          </div>
          <div className={styles.textWrapper}>
            <div>
              <h1 className={styles.layerTitle}>Server-side analysis and machine learning</h1>
            </div>
            <div>
              <h3 className={styles.layerTitle}>Storage and deduplication</h3>
            </div>
            <div>
              <h3 className={styles.layerTitle}>Cookie and local storage management</h3>
            </div>
            <div>
              <h3 className={styles.layerTitle}>Browser Fingerprinting Library</h3>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
