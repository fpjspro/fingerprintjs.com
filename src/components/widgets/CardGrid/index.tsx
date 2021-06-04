import React from 'react'
import PreviewCompatibleImage, { ImageInfo } from '../../common/PreviewCompatibleImage/PreviewCompatibleImage'
import classNames from 'classnames'

import styles from './CardGrid.module.scss'

export interface Card {
  icon?: ImageInfo
  iconAlt?: string
  iconTitle?: string
  title: string
  content: React.ReactNode
}

export interface CardGridProps {
  cards: Card[]
  perRow?: 2 | 3 | 4
  className?: string
}

export default function CardGrid({ cards, className, perRow = 2 }: CardGridProps) {
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
            icon={card.icon}
            iconAlt={card.iconAlt}
            iconTitle={card.iconTitle}
            title={card.title}
            content={card.content}
          />
        </div>
      ))}
    </section>
  )
}

export function CardComponent({ icon, iconAlt, iconTitle, title, content }: Card) {
  return (
    <div className={styles.card}>
      {icon && (
        <span className={styles.row}>
          <PreviewCompatibleImage className={styles.icon} imageInfo={icon} altTag={iconAlt} titleTag={iconTitle} />
        </span>
      )}
      <header className={styles.title}>{title}</header>
      {content}
    </div>
  )
}
