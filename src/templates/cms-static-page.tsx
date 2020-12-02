import { graphql } from 'gatsby'
import React from 'react'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import InlineCtaComponent, { InlineCta } from '../components/widgets/InlineCta'
import Hero, { HeroProps } from '../components/widgets/Hero'
import { LayoutTemplate } from '../components/Layout'
import Container from '../components/common/Container'
import { ArrayElement } from '../helpers/types'
import AlternatingImagesText, { BlockWithImage } from '../components/widgets/AlternatingImagesText'
import CardSectionComponent, { CardSection } from '../components/widgets/CardSection'
import { Card } from '../components/widgets/CardGrid'

import styles from './cms-static-page.module.scss'

export default function CmsStaticPage({ data }: { data: GatsbyTypes.CmsStaticPageQuery }) {
  if (
    !data.markdownRemark?.frontmatter ||
    !data.markdownRemark?.frontmatter?.invertContent ||
    !data.markdownRemark?.frontmatter?.inlineCta ||
    !data.markdownRemark?.frontmatter?.cardSection ||
    !data.markdownRemark?.frontmatter?.blocks ||
    !data.markdownRemark?.frontmatter?.hero
  ) {
    return null
  }

  const invertContent = data.markdownRemark.frontmatter.invertContent
  const inlineCta = mapToInlineCta(data.markdownRemark.frontmatter.inlineCta)
  const cardSection = mapToCardSection(data.markdownRemark.frontmatter.cardSection)
  const blocks = mapToBlocks(data.markdownRemark.frontmatter.blocks as QueryBlock[])
  const hero = mapToHero(data.markdownRemark.frontmatter.hero)

  return (
    <CmsStaticPageTemplate
      invertContent={invertContent}
      inlineCta={inlineCta}
      cardSection={cardSection}
      blocks={blocks}
      hero={hero}
    />
  )
}

export const pageQuery = graphql`
  query CmsStaticPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        invertContent
        hero {
          title
          description
          ctaText
          ctaHref
        }
        cardSection {
          title
          subtitle
          cards {
            icon {
              childImageSharp {
                fixed(width: 28, quality: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            title
            content
          }
        }
        blocks {
          content
          subheader
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          isImageAfterText
          ctaText
          ctaUrl
          isCtaButton
        }
        inlineCta {
          title
          subtitle
          buttonText
          buttonHref
        }
      }
    }
  }
`

export interface CmsStaticPageProps {
  invertContent: boolean
  inlineCta: InlineCta
  cardSection: CardSection
  blocks: BlockWithImage[]
  hero: HeroProps
}
export function CmsStaticPageTemplate({
  invertContent = false,
  inlineCta,
  cardSection,
  blocks,
  hero,
}: CmsStaticPageProps) {
  return (
    <LayoutTemplate siteMetadata={{ title: 'preview', description: 'desc', image: 'none', url: 'url' }}>
      <Container>
        <Hero {...hero} className={styles.widget} />
        {invertContent ? (
          <>
            <AlternatingImagesText title={''} blocks={blocks} className={styles.widget} />
            <CardSectionComponent {...cardSection} className={styles.widget} />
          </>
        ) : (
          <>
            <CardSectionComponent {...cardSection} className={styles.widget} />
            <AlternatingImagesText title={''} blocks={blocks} className={styles.widget} />
          </>
        )}
        <InlineCtaComponent {...inlineCta} className={styles.widget} />
      </Container>
    </LayoutTemplate>
  )
}

export function CmsStaticPagePreview({ entry }: PreviewTemplateComponentProps) {
  const invertContent = entry.getIn(['data', 'invertContent'])
  const inlineCta = entry.getIn(['data', 'inlineCta'])?.toObject() as QueryInlineCta

  let cardSection = entry.getIn(['data', 'cardSection'])?.toObject()
  if (cardSection?.cards) {
    cardSection.cards = entry.getIn(['data', 'cardSection', 'cards'])?.toJS()
  }
  cardSection = cardSection as QueryCardSection

  const blocks = entry.getIn(['data', 'blocks'])?.toJS() as QueryBlock[]
  const hero = entry.getIn(['data', 'hero'])?.toObject() as QueryHero

  return (
    <CmsStaticPageTemplate
      invertContent={invertContent}
      inlineCta={mapToInlineCta(inlineCta)}
      cardSection={mapToCardSection(cardSection)}
      blocks={mapToBlocks(blocks)}
      hero={mapToHero(hero)}
    />
  )
}

type QueryHero = NonNullable<NonNullable<GatsbyTypes.CmsStaticPageQuery['markdownRemark']>['frontmatter']>['hero']
function mapToHero(queryHero: QueryHero): HeroProps {
  return {
    title: queryHero?.title ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description:
      queryHero?.description ??
      'Vestibulum ut mi eleifend, auctor ligula ut, feugiat nunc. Donec molestie ipsum at sagittis elementum.',
    ctaText: queryHero?.ctaText ?? 'Lorem ipsum',
    ctaHref: queryHero?.ctaHref ?? '/',
  } as HeroProps
}

type QueryCardSection = NonNullable<
  NonNullable<GatsbyTypes.CmsStaticPageQuery['markdownRemark']>['frontmatter']
>['cardSection']
function mapToCardSection(queryCardSection: QueryCardSection): CardSection {
  return {
    title: queryCardSection?.title ?? 'Vivamus at ex a mi bibendum sollicitudin sit amet laoreet mi.',
    subtitle: queryCardSection?.subtitle ?? '',
    cards:
      queryCardSection?.cards?.map(
        (card, index) =>
          ({
            icon: card?.icon,
            title: card?.title ?? `Nunc rhoncus et eros non lobortis. #${index}`,
            content:
              card?.content ??
              'Sed ut fermentum dolor. Vivamus pulvinar nisi leo, in accumsan diam pretium id. Vestibulum aliquam posuere enim, sed finibus sapien fringilla pharetra. Ut sollicitudin nunc non dui placerat facilisis. Duis neque turpis, dictum sit amet sagittis ut, finibus ac eros. Cras pulvinar laoreet diam vel lacinia.',
          } as Card)
      ) ?? [],
  } as CardSection
}

type QueryBlock = ArrayElement<
  NonNullable<NonNullable<GatsbyTypes.CmsStaticPageQuery['markdownRemark']>['frontmatter']>['blocks']
>
function mapToBlocks(queryBlocks: QueryBlock[]): BlockWithImage[] {
  return (
    queryBlocks?.map(
      (block, index) =>
        ({
          content:
            block?.content ??
            'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas in ex turpis.',
          image: block?.image,
          subTitle:
            block?.subheader ?? `Vestibulum aliquam posuere enim, sed finibus sapien fringilla pharetra. #${index}`,
          isImageAfterText: block?.isImageAfterText ?? false,
          ctaText: block?.ctaText ?? 'Lorem ipsum',
          ctaUrl: block?.ctaUrl ?? '/',
          isCtaButton: block?.isCtaButton ?? false,
        } as BlockWithImage)
    ) ?? []
  )
}

type QueryInlineCta = NonNullable<
  NonNullable<GatsbyTypes.CmsStaticPageQuery['markdownRemark']>['frontmatter']
>['inlineCta']
function mapToInlineCta(queryInlineCta: QueryInlineCta): InlineCta {
  return {
    title: queryInlineCta?.title ?? 'Quisque arcu urna, tempor aliquet mi eget.',
    subtitle:
      queryInlineCta?.subtitle ??
      'Curabitur sollicitudin id mi ac ultrices. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas in ex turpis.',
    buttonText: queryInlineCta?.buttonText ?? 'Lorem ipsum',
    buttonHref: queryInlineCta?.buttonHref ?? '/',
  } as InlineCta
}
