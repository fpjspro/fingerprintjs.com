import React from 'react'
import PreviewCompatibleImage, { ImageInfo } from '../common/PreviewCompatibleImage/PreviewCompatibleImage'

import styles from './TitledParagraph.module.scss'

export interface TitledParagraphProps {
  icon?: ImageInfo
  iconAlt?: string
  iconTitle?: string
  title: string
  children: React.ReactNode
}
export default function TitledParagraph({ icon, iconAlt, iconTitle, title, children }: TitledParagraphProps) {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        {icon && (
          <div className={styles.iconContainer}>
            <PreviewCompatibleImage className={styles.icon} imageInfo={icon} altTag={iconAlt} titleTag={iconTitle} />
          </div>
        )}
        <h3 className={styles.title}>{title}</h3>
      </header>

      <div>{children}</div>
    </div>
  )
}
