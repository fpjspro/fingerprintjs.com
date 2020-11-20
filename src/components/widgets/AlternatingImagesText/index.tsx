import React from 'react'
import PreviewCompatibleImage, { ImageInfo } from '../../common/PreviewCompatibleImage/PreviewCompatibleImage'
import TextList from '../../common/TextList'

import styles from './AlternatingImagesTextProps.module.scss'

export interface BlockWithImage {
  image: ImageInfo
  subTitle: string
  bullets: string[]
}

export interface AlternatingImagesTextProps {
  title: string
  blocks: BlockWithImage[]
}
export default function AlternatingImagesText({ title, blocks }: AlternatingImagesTextProps) {
  return (
    <section className={styles.root}>
      <h2 className={styles.title}>{title}</h2>

      {blocks.map((block) => (
        <Block key={block.subTitle} block={block} />
      ))}
    </section>
  )
}

function Block({ block }: { block: BlockWithImage }) {
  return (
    <section className={styles.block}>
      <PreviewCompatibleImage className={styles.image} imageInfo={block.image} />

      <div className={styles.text}>
        <h3 className={styles.blockTitle}>{block.subTitle}</h3>
        <TextList items={block.bullets} ordered />
      </div>
    </section>
  )
}

//TODO: [DI]: Final fixes for styles, add ability to switch picture side in block
