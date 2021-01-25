import React from 'react'
import Container from '../../common/Container'
import Section from '../../common/Section'
import CardGrid, { Card } from '../CardGrid'
import SubHeader from '../SubHeader'
import classNames from 'classnames'

import styles from './CardSection.module.scss'

export interface CardSectionProps {
  title: string
  subtitle?: string
  cards: Card[]
  className?: string
}

export default function CardSection({ title, subtitle, cards, className }: CardSectionProps) {
  return (
    <Section className={classNames(className, styles.root)}>
      <Container size='large'>
        <div className={styles.cardSection}>
          <SubHeader title={title} subtitle={subtitle} titleWeight='primary' />
          <CardGrid cards={cards} />
        </div>
      </Container>
    </Section>
  )
}
