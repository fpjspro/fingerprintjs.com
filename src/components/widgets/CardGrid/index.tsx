import React from 'react'
import PreviewCompatibleImage, { ImageInfo } from '../../common/PreviewCompatibleImage/PreviewCompatibleImage'

import styles from './CardGrid.module.scss'

export interface Card {
  icon?: ImageInfo
  title: string
  content: string
}

export interface CardGridProps {
  cards: Card[]
}

export default function CardGrid({ cards }: CardGridProps) {
  return (
    <section className={styles.grid}>
      {cards.map((card) => (
        <div key={card.title} className={styles.item}>
          <CardComponent icon={card.icon} title={card.title} content={card.content} />
        </div>
      ))}
    </section>
  )
}

export function CardComponent({ icon, title, content }: Card) {
  return (
    <div className={styles.card}>
      {icon && <PreviewCompatibleImage className={styles.icon} imageInfo={icon} />}
      <header className={styles.title}>{title}</header>

      <div className={styles.content}>{content}</div>
    </div>
  )
}
