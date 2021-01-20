import React from 'react'
import PreviewCompatibleImage, { ImageInfo } from '../../common/PreviewCompatibleImage/PreviewCompatibleImage'
import classNames from 'classnames'
import { DangerouslyRenderHtmlContent } from '../../Content/Content'

import styles from './CardGrid.module.scss'

export interface Card {
  icon?: ImageInfo
  title: string
  content: string
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
          <CardComponent icon={card.icon} title={card.title} content={card.content} />
        </div>
      ))}
    </section>
  )
}

export function CardComponent({ icon, title, content }: Card) {
  return (
    <div className={styles.card}>
      {icon && (
        <span className={styles.row}>
          <PreviewCompatibleImage className={styles.icon} imageInfo={icon} />
        </span>
      )}
      <header className={styles.title}>{title}</header>
      <DangerouslyRenderHtmlContent className={styles.content} content={content} />
    </div>
  )
}
