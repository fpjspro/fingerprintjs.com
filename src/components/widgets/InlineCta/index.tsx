import React from 'react'
import Button from '../../common/Button'
import Container from '../../common/Container'
import Section from '../../common/Section'
import SubHeader from '../SubHeader'
import classNames from 'classnames'

import styles from './InlineCta.module.scss'

export interface InlineCtaProps {
  title: string
  subtitle: React.ReactNode
  buttonText: string
  buttonHref: string
  className?: string
}

export default function InlineCta({ title, subtitle, buttonText, buttonHref, className }: InlineCtaProps) {
  return (
    <Section className={classNames(styles.root, className)}>
      <Container size='large' className={styles.container}>
        <SubHeader title={title} titleSize='large' titleWeight='primary' subtitle={subtitle} align='left' />

        <Button href={buttonHref} className={styles.button}>
          {buttonText}
        </Button>
      </Container>
    </Section>
  )
}
