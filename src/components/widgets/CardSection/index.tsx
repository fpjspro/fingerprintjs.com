import React from 'react'
import CardGrid, { Card } from '../CardGrid'
import SubHeaderComponent from '../SubHeader'

import styles from './CardSection.module.scss'

export interface CardSection {
  title: string
  subtitle?: string
  cards: Card[]
}

export default function CardSectionComponent({ title, subtitle, cards }: CardSection) {
  return (
    <section className={styles.cardSection}>
      <SubHeaderComponent title={title} subtitle={subtitle} />
      <CardGrid cards={cards} />
    </section>
  )
}
