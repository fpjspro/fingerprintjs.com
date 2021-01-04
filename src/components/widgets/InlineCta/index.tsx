import React from 'react'
import Button from '../../common/Button'
import Container from '../../common/Container'
import Section from '../../common/Section'
import SubHeaderComponent from '../SubHeader'
import classNames from 'classnames'

import styles from './InlineCta.module.scss'

export interface InlineCta {
  title: string
  subtitle: string
  buttonText: string
  buttonHref: string
  className?: string
}

export default function InlineCtaComponent({ title, subtitle, buttonText, buttonHref, className }: InlineCta) {
  return (
    <Section className={classNames(styles.root, className)}>
      <Container size='large' className={styles.container}>
        <SubHeaderComponent
          title={title}
          titleSize='large'
          titleWeight='bold'
          subtitle={subtitle}
          subtitleSize='small'
          align='left'
        />

        <Button href={buttonHref} className={styles.button}>
          {buttonText}
        </Button>
      </Container>
    </Section>
  )
}
