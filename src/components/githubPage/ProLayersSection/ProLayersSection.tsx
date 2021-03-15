import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import proLayers from './proLayers.png'

import styles from './ProLayersSection.module.scss'

export default function ProLayersSection() {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <div>
          <h2 className={styles.title}>Pro is Powered By Open Source</h2>
        </div>
        <img alt='FingerprintJS Pro layers' src={proLayers} className={styles.image} />
      </Container>
    </Section>
  )
}
