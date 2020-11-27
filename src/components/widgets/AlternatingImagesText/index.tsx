import React from 'react'
import PreviewCompatibleImage, { ImageInfo } from '../../common/PreviewCompatibleImage/PreviewCompatibleImage'
import TextList from '../../common/TextList'
import Container from '../../common/Container'
import Section from '../../common/Section'
import classNames from 'classnames'
import styles from './AlternatingImagesText.module.scss'
import Button from '../../common/Button'
import { Link } from 'gatsby'

export interface BlockWithImage {
  image: ImageInfo
  subTitle: string
  bullets: string[]
  isImageAfterText: boolean
  ctaText: string
  ctaUrl: string
  isCtaButton: boolean
}

export interface AlternatingImagesTextProps {
  title: string
  blocks: BlockWithImage[]
}
export default function AlternatingImagesText({ title, blocks }: AlternatingImagesTextProps) {
  return (
    <Section className={styles.root}>
      <h2 className={styles.title}>{title}</h2>

      {blocks.map((block) => (
        <Block key={block.subTitle} block={block} />
      ))}
    </Section>
  )
}

function Block({ block }: { block: BlockWithImage }) {
  return (
    <Container className={styles.container}>
      <PreviewCompatibleImage className={styles.image} imageInfo={block.image} />

      <div className={classNames(styles.text, { [styles.left]: block.isImageAfterText })}>
        <h3 className={styles.blockTitle}>{block.subTitle}</h3>
        <TextList className={styles.list} items={block.bullets} ordered />
        {block.ctaText && <CtaComponent {...block} />}
      </div>
    </Container>
  )
}

interface CtaComponentProps {
  ctaText: string
  ctaUrl: string
  isCtaButton: boolean
}

function CtaComponent({ ctaUrl, ctaText, isCtaButton }: CtaComponentProps) {
  return isCtaButton ? (
    <Button href={ctaUrl}>{ctaText}</Button>
  ) : (
    <Link className={styles.link} to={ctaUrl}>
      {ctaText}
    </Link>
  )
}

//TODO: [DI]: Final fixes for styles, add ability to switch picture side in block
