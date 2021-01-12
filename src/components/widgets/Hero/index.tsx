import React from 'react'
import Button from '../../common/Button'
import Container from '../../common/Container'
import Section from '../../common/Section'
import SubHeaderComponent from '../SubHeader'
import classNames from 'classnames'

import styles from './Hero.module.scss'

export interface HeroProps {
  title: string
  description: string
  ctaText: string
  ctaHref: string
  className?: string
}
export default function Hero({ title, description, ctaText, ctaHref, className }: HeroProps) {
  return (
    <Section className={classNames(styles.section, className)}>
      <Container size='large' className={styles.container}>
        <SubHeaderComponent
          title={title}
          titleSize='large'
          titleWeight='primary'
          subtitle={description}
          subtitleSize='normal'
          align='center'
          className={styles.subHeader}
        />

        <Button href={ctaHref} className={styles.button}>
          {ctaText}
        </Button>
      </Container>
    </Section>
  )
}
