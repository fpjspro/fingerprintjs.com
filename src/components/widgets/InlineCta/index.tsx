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
  subtitle: React.ReactNode
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
          subtitle={{ text: subtitle, size: 'normal' }}
          align='left'
          className={styles.subheader}
        />

        <div className={styles.actions}>
          {secondaryAction && <ActionComponent action={secondaryAction} variant='outline' />}
          <ActionComponent action={primaryAction} />
        </div>
      </Container>
    </Section>
  )
}

interface ActionComponentProps {
  action: Action
  variant?: 'primary' | 'outline'
}
function ActionComponent({
  action: { label, name, action, type = 'button' },
  variant = 'primary',
}: ActionComponentProps) {
  const actionProps = typeof action === 'string' ? { href: action } : { onClick: action }
  const trigger =
    type === 'button' ? (
      <Button {...actionProps} variant={variant}>
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
