import React from 'react'
import PreviewCompatibleImage, { ImageInfo } from '../../common/PreviewCompatibleImage/PreviewCompatibleImage'
import Container from '../../common/Container'
import Section from '../../common/Section'
import classNames from 'classnames'
import styles from './AlternatingImagesText.module.scss'
import Button from '../../common/Button'
import { Link } from 'gatsby'

export interface BlockWithImage {
  image: ImageInfo
  subTitle: string
  content: string
  isImageAfterText: boolean
  ctaText: string
  ctaUrl: string
  isCtaButton: boolean
}

export interface AlternatingImagesTextProps {
  title: string
  blocks: BlockWithImage[]
  className?: string | string[]
}
export default function AlternatingImagesText({ title, blocks, className }: AlternatingImagesTextProps) {
  return (
    <Section className={classNames(styles.root, className)}>
      <h2 className={styles.title}>{title}</h2>

      {blocks.map((block) => (
        <Block key={block.subTitle} block={block} />
      ))}
    </Section>
  )
}

function Block({ block }: { block: BlockWithImage }) {
  return (
    <Container size='large' className={styles.container}>
      <PreviewCompatibleImage className={styles.image} imageInfo={block.image} />

      <div className={classNames(styles.text, { [styles.left]: block.isImageAfterText })}>
        <h3 className={styles.blockTitle}>{block.subTitle}</h3>
        <p className={styles.content}>{block.content}</p>
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
