import React from 'react'
import classNames from 'classnames'
import Button from '../common/Button'

import styles from './ActionableCard.module.scss'

export interface Card {
  title: string
  description: string
  content: string
  btnText: string
  btnHref: string
  variant?: 'primary' | 'outline' | 'clear' | 'faded'
}

export interface ActionableCardProps {
  cards: Card[]
  perRow?: 2 | 3 | 4
  className?: string
}

export default function ActionableCard({ cards, className, perRow = 2 }: ActionableCardProps) {
  return (
    <section className={classNames(styles.grid, className)}>
      {cards.map((card) => (
        <div
          key={card.title}
          className={classNames(
            styles.item,
            { [styles.twoPerRow]: perRow === 2 },
            { [styles.threePerRow]: perRow === 3 },
            { [styles.fourPerRow]: perRow === 4 }
          )}
        >
          <CardComponent
            title={card.title}
            description={card.description}
            content={card.content}
            btnText={card.btnText}
            btnHref={card.btnHref}
            variant={card.variant}
          />
        </div>
      ))}
    </section>
  )
}

export function CardComponent({ title, description, content, btnHref, btnText, variant }: Card) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <p className={styles.content}>{content}</p>
      <Button href={btnHref} variant={variant} className={styles.button}>
        {btnText}
      </Button>
    </div>
  )
}
