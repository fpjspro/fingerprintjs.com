import React from 'react'
import Container from '../../common/Container'
import Section from '../../common/Section'
import CardGrid, { Card } from '../CardGrid'
import SubHeaderComponent from '../SubHeader'
import classNames from 'classnames'

import styles from './CardSection.module.scss'

export interface CardSection {
  title: string
  subtitle?: string
  cards: Card[]
  className?: string | string[]
}

export default function CardSectionComponent({ title, subtitle, cards, className }: CardSection) {
  return (
    <Section className={classNames(styles.root, className)}>
      <Container size='large' className={styles.container}>
        <div className={styles.cardSection}>
          <SubHeaderComponent title={title} subtitle={subtitle} />
          <CardGrid cards={cards} />
        </div>
      </Container>
    </Section>
  )
}
