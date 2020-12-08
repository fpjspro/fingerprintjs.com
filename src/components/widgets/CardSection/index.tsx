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
  className?: string
}

export default function CardSectionComponent({ title, subtitle, cards, className }: CardSection) {
  return (
    <Section className={classNames(className)}>
      <Container size='large'>
        <div className={styles.cardSection}>
          <SubHeaderComponent title={title} subtitle={subtitle} />
          <CardGrid cards={cards} />
        </div>
      </Container>
    </Section>
  )
}
