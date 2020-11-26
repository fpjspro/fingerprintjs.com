import React from 'react'
import Button from '../../common/Button'
import backgroundImage from '../../../img/bg-full.png'

import styles from './InlineCta.module.scss'

export interface InlineCta {
  title: string
  subtitle: string
  buttonText: string
  buttonHref: string
}

export default function InlineCtaComponent({ title, subtitle, buttonText, buttonHref }: InlineCta) {
  return (
    <section className={styles.inlineCta}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subtitle}>{subtitle}</h2>
      </header>

      {buttonText && buttonHref && (
        <Button small={true} href={buttonHref} className={styles.button}>
          {buttonText}
        </Button>
      )}
    </section>
  )
}
