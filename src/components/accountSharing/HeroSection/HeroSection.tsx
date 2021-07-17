import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { PATH } from '../../../constants/content'
import { ReactComponent as HeroSVG } from './heroSVG.svg'
import { ReactComponent as HeroMobileSVG } from './HeroMobileSVG.svg'

import styles from './HeroSection.module.scss'

export default function HeroSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container}>
        <section className={styles.imageSectionMobile}>
          <HeroMobileSVG className={styles.heroImage} />
        </section>
        <section className={styles.descriptionSection}>
          <h1 className={styles.title}>ACCOUNT SHARING PREVENTION</h1>
          <h2 className={styles.subtitle}>
            Unlock subscription
            <br />
            revenue from your
            <br />
            existing customers
          </h2>
          <p className={styles.description}>
            Ensure your users pay their fair share with FingerprintJS Account Sharing Prevention
          </p>
          <Button href={PATH.pricingUrl} variant='primary' big={true} className={styles.button}>
            Talk to sales
          </Button>
        </section>
        <section className={styles.imageSection}>
          <HeroSVG className={styles.heroImage} />
        </section>
      </Container>
    </Section>
  )
}
