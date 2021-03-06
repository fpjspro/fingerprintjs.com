import React from 'react'
import Button from '../../common/Button'
import Container from '../../common/Container'
import Section from '../../common/Section'
import SubHeader from '../SubHeader'
import classNames from 'classnames'

import styles from './Hero.module.scss'

export interface HeroProps {
  title: string
  description: string
  ctaText: string
  ctaHref: string
  openCtaNewTab?: boolean
  className?: string
}
export default function Hero({ title, description, ctaText, ctaHref, openCtaNewTab, className }: HeroProps) {
  return (
    <Section className={classNames(styles.section, className)}>
      <Container size='large' className={styles.container}>
        <SubHeader
          title={{ text: title, size: 'large', weight: 'primary' }}
          subtitle={{ text: description, size: 'normal' }}
          align='center'
          className={styles.subHeader}
        />

        <Button href={ctaHref} className={styles.button} openNewTab={openCtaNewTab}>
          {ctaText}
        </Button>
      </Container>
    </Section>
  )
}
