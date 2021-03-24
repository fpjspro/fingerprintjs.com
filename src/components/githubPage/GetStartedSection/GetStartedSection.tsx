import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import ActionableCards, { Card } from '../../ActionableCards/ActionableCards'
import { useMainBackgroundImage } from '../../../hooks/useBackgroundImage'
import { URL } from '../../../constants/content'

import styles from './GetStartedSection.module.scss'

export default function GetStartedSection() {
  const { mainBackground } = useMainBackgroundImage()

  return (
    <Section className={styles.root} backgroundImageFluid={mainBackground}>
      <Container size='large' className={styles.container}>
        <h1 className={styles.title}>Get Started With FingerprintJS</h1>
        <ActionableCards cards={cards} />
      </Container>
    </Section>
  )
}

const cards = [
  {
    title: 'Open Source',
    description: 'Recommended for personal projects, and teams building their identifiers.',
    content: 'Browser fingerprinting library with high accuracy and stability.',
    btnText: 'Get it on Github',
    btnHref: `${URL.githubRepoUrl}`,
    variant: 'outline',
  },
  {
    title: 'Pro',
    description: 'Recommended for businesses, and teams looking for a "turnkey" solution.',
    content: 'Cloud-hosted user identification service with 99.5% accuracy.',
    btnText: 'Start Free Trial',
    btnHref: `${URL.signupUrl}`,
    variant: 'primary',
  },
] as Card[]
