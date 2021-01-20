import React from 'react'
import Button from '../../common/Button'
import Container from '../../common/Container'
import Section from '../../common/Section'
import SubHeaderComponent from '../SubHeader'
import classNames from 'classnames'
import { DangerouslyRenderHtmlContent } from '../../Content/Content'

import styles from './InlineCta.module.scss'

export interface InlineCta {
  title: string
  subtitle: string | React.ReactNode
  buttonText: string
  buttonHref: string
  className?: string
}

export default function InlineCtaComponent({ title, subtitle, buttonText, buttonHref, className }: InlineCta) {
  const subtitleComponent = <DangerouslyRenderHtmlContent content={subtitle} className={styles.content} />

  return (
    <Section className={classNames(styles.root, className)}>
      <Container size='large' className={styles.container}>
        <SubHeaderComponent
          title={title}
          titleSize='large'
          titleWeight='primary'
          subtitle={subtitleComponent}
          align='left'
        />

        <Button href={buttonHref} className={styles.button}>
          {buttonText}
        </Button>
      </Container>
    </Section>
  )
}
