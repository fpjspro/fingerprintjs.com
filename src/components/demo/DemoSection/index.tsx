import React from 'react'
import Container from '../../common/Container'
import Section from '../../common/Section'
import FpjsWidget from '../../../components/FpjsWidget'
import { useMainBackgroundImage } from '../../../hooks/useBackgroundImage'

import styles from './DemoSection.module.scss'

export default function DemoSection() {
  const { mainBackground } = useMainBackgroundImage()

  return (
    <Section className={styles.demoSection} backgroundImageFluid={mainBackground}>
      <Container size='large' className={styles.demoContainer}>
        <div className={styles.card}>
          <CardHeader title='Technical demo'>
            Browser fingerprinting API demo
            <br />
            <strong className={styles.strong}>99.5%</strong> identification accuracy
          </CardHeader>
        </div>
        <div className={styles.widgetContainer}>
          <FpjsWidget />
        </div>
      </Container>
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
