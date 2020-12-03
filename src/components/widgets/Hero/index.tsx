import React from 'react'
import Button from '../../common/Button'
import Container from '../../common/Container'
import Section from '../../common/Section'

import styles from './Hero.module.scss'

export interface HeroProps {
  title: string
  description: string
  ctaText: string
}
export default function Hero({ title, description, ctaText }: HeroProps) {
  return (
    <Section className={styles.section}>
      <Container size='large' className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <Button className={styles.button}>{ctaText}</Button>
      </Container>
    </Section>
  )
}
