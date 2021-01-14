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
  primaryAction?: string
  buttonText: string
  buttonHref: string
  secondaryAction?: string
  secondaryLink?: string
  secondaryHref?: string
  size?: 'small' | 'regular' | 'large'
  className?: string
}

export default function InlineCtaComponent({
  title,
  subtitle,
  primaryAction,
  buttonText,
  buttonHref,
  secondaryAction,
  secondaryLink,
  secondaryHref,
  size = 'large',
  className,
}: InlineCta) {
  return (
    <Section className={classNames(styles.root, className)}>
      <Container size={size} className={styles.container}>
        <SubHeaderComponent
          title={title}
          titleSize='large'
          titleWeight='primary'
          subtitle={subtitle}
          subtitleSize='small'
          align='left'
        />

        <div className={styles.actions}>
          <span className={styles.label}>{secondaryAction}</span>
          <a href={secondaryHref} className={styles.link}>
            {secondaryLink}
          </a>

          <span className={styles.label}>{primaryAction}</span>
          <Button href={buttonHref} className={styles.button}>
            {buttonText}
          </Button>
        </div>
      </Container>
    </Section>
  )
}
