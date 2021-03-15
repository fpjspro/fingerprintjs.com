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
        <h1 className={styles.proTitle}>FingerprintJS Pro</h1>
        <div className={styles.wrapper}>
          <div className={styles.imageWrapper}>
            <div className={styles.aside}>
              <div className={styles.server}>Runs on server</div>
              <div className={styles.browser}>Runs in browser</div>
            </div>
            <img alt='FingerprintJS Pro layers' src={proLayers} className={styles.image} />
          </div>
          <div className={styles.textWrapper}>
            <div className={styles.layer}>
              <h1 className={styles.layerTitle}>Server-side analysis and machine learning</h1>
              <h2 className={styles.layerSubtitle}>
                Holistic view of all attributes and layers below to generate the most stable and accurate visitorID
              </h2>
            </div>
            <div className={styles.layer}>
              <h1 className={styles.layerTitle}>Storage and deduplication</h1>
              <h2 className={styles.layerSubtitle}>
                Stores all attributes collected to do fuzzy matching and handle browser and OS upgrades
              </h2>
            </div>
            <div className={styles.layer}>
              <h1 className={styles.layerTitle}>Cookie and local storage management</h1>
              <h2 className={styles.layerSubtitle}>First party cookies and local storage</h2>
            </div>
            <div className={styles.ossLayer}>
              <h1 className={styles.ossTitle}>Open Source</h1>
              <h1 className={styles.layerTitle}>Browser Fingerprinting Library</h1>
              <h2 className={styles.layerSubtitle}>
                Generates browser fingerprints from exact matching browser attributes
              </h2>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
