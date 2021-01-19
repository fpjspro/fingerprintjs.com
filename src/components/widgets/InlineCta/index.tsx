import React from 'react'
import Button from '../../common/Button'
import Container from '../../common/Container'
import Section from '../../common/Section'
import SubHeaderComponent from '../SubHeader'
import classNames from 'classnames'

import styles from './InlineCta.module.scss'

export interface Action {
  label?: string
  name: string
  action: string | (() => void)
  type?: 'link' | 'button'
}
export interface InlineCta {
  title: string
  subtitle: string
  primaryAction: Action
  secondaryAction?: Action
  size?: 'small' | 'regular' | 'large'
  className?: string
}

export default function InlineCtaComponent({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  size = 'large',
  className,
}: InlineCta) {
  return (
    <Section className={classNames(styles.root, className)}>
      <Container size={size} className={styles.container}>
        <SubHeaderComponent
          title={{ text: title, size: 'large', weight: 'primary' }}
          subtitle={{ text: subtitle, size: 'small' }}
          align='left'
        />

        <div className={styles.actions}>
          {secondaryAction && <ActionComponent action={secondaryAction} />}
          <ActionComponent action={primaryAction} />
        </div>
      </Container>
    </Section>
  )
}

function ActionComponent({ action: { label, name, action, type = 'button' } }: { action: Action }) {
  const actionProps = typeof action === 'string' ? { href: action } : { onClick: action }
  const trigger =
    type === 'button' ? (
      <Button className={styles.button} {...actionProps}>
        {name}
      </Button>
    ) : (
      <a className={styles.link} {...actionProps}>
        {name}
      </a>
    )

  return (
    <div className={styles.action}>
      {label && <span className={styles.label}>{label}</span>}
      {trigger}
    </div>
  )
}
