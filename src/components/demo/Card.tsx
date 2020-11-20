import React from 'react'
import Section from '../../components/common/Section'
import FpjsWidget from '../../components/FpjsWidget'
import styles from './Card.module.scss'

export default function DemoCard() {
  return (
    <Section className={styles.card}>
      <CardHeader title='Technical demo'>
        Browser fingerprinting API demo
        <br />
        <strong className={styles.strong}>99.5%</strong> identification accuracy
      </CardHeader>
      <FpjsWidget />
    </Section>
  )
}

interface CardHeaderProps {
  title: string
  children?: React.ReactNode
}

function CardHeader({ title, children }: CardHeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.description}>{children}</span>
    </header>
  )
}
