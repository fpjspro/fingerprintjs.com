import { graphql } from 'gatsby'
import React from 'react'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import InlineCtaComponent, { InlineCta } from '../components/widgets/InlineCta'
import Hero, { HeroProps } from '../components/widgets/Hero'
import { LayoutTemplate } from '../components/Layout'
import { ArrayElement, GeneratedPageContext } from '../helpers/types'
import AlternatingImagesText, { BlockWithImage } from '../components/widgets/AlternatingImagesText'
import CardSectionComponent, { CardSection } from '../components/widgets/CardSection'
import { Card } from '../components/widgets/CardGrid'
import { BASE_URL } from '../constants/content'
import Section from '../components/common/Section'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import { Breadcrumb } from '../components/Breadcrumbs/Breadcrumbs'
import { withTrailingSlash } from '../helpers/url'

import styles from './static-page-content.module.scss'

interface StaticPageContentProps {
  data: GatsbyTypes.StaticPageContentQuery
  pageContext: GeneratedPageContext
}
export default function StaticPageContent({ data, pageContext }: StaticPageContentProps) {
  if (
    data.markdownRemark?.frontmatter === undefined ||
    data.markdownRemark?.frontmatter?.metadata === undefined ||
    data.markdownRemark?.frontmatter?.invertContent === undefined ||
    data.markdownRemark?.frontmatter?.inlineCta === undefined ||
    data.markdownRemark?.frontmatter?.cardSection === undefined ||
    data.markdownRemark?.frontmatter?.blocks === undefined ||
    data.markdownRemark?.frontmatter?.hero === undefined
  ) {
    return null
  }

  const metadata = mapToMetadata(data.markdownRemark.frontmatter.metadata)
  const invertContent = data.markdownRemark.frontmatter.invertContent
  const inlineCta = mapToInlineCta(data.markdownRemark.frontmatter.inlineCta)
  const cardSection = mapToCardSection(data.markdownRemark.frontmatter.cardSection)
  const blocks = mapToBlocks(data.markdownRemark.frontmatter.blocks as QueryBlock[])
  const hero = mapToHero(data.markdownRemark.frontmatter.hero)

  return (
    <StaticPageContentTemplate
      metadata={metadata}
      invertContent={invertContent}
      inlineCta={inlineCta}
      cardSection={cardSection}
      blocks={blocks}
      hero={hero}
      breadcrumbs={pageContext.breadcrumb.crumbs}
    />
  )
}

export const pageQuery = graphql`
  query StaticPageContent($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        metadata {
          title
          description
          url
          image {
            publicURL
          }
        }
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
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
              extension
              publicURL
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
                ...GatsbyImageSharpFluid_withWebp
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

export interface StaticPageContentTemplateProps {
  metadata: GatsbyTypes.SiteSiteMetadata
  invertContent: boolean
  inlineCta: InlineCta
  cardSection: CardSection
  blocks: BlockWithImage[]
  hero: HeroProps
  breadcrumbs?: Array<Breadcrumb>
}
export function StaticPageContentTemplate({
  metadata,
  invertContent = false,
  inlineCta,
  cardSection,
  blocks,
  hero,
  breadcrumbs,
}: StaticPageContentTemplateProps) {
  return (
    <LayoutTemplate siteMetadata={metadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <Section className={styles.section}>
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
        <InlineCtaComponent {...inlineCta} />
      </Section>
    </LayoutTemplate>
  )
}

export function StaticPageContentPreview({ entry }: PreviewTemplateComponentProps) {
  const metadata = entry.getIn(['data', 'metadata'])?.toObject() as QueryMetadata
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
    <StaticPageContentTemplate
      metadata={mapToMetadata(metadata)}
      invertContent={invertContent}
      inlineCta={mapToInlineCta(inlineCta)}
      cardSection={mapToCardSection(cardSection)}
      blocks={mapToBlocks(blocks)}
      hero={mapToHero(hero)}
    />
  )
}

type QueryMetadata = NonNullable<
  NonNullable<GatsbyTypes.StaticPageContentQuery['markdownRemark']>['frontmatter']
>['metadata']
function mapToMetadata(queryMetadata: QueryMetadata): GatsbyTypes.SiteSiteMetadata {
  return {
    title: queryMetadata?.title ?? '',
    description: queryMetadata?.description ?? '',
    siteUrl: withTrailingSlash(queryMetadata?.url ?? ''),
    image: `${BASE_URL}${queryMetadata?.image?.publicURL}` ?? '',
  } as GatsbyTypes.SiteSiteMetadata
}

type QueryHero = NonNullable<NonNullable<GatsbyTypes.StaticPageContentQuery['markdownRemark']>['frontmatter']>['hero']
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
  NonNullable<GatsbyTypes.StaticPageContentQuery['markdownRemark']>['frontmatter']
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
  NonNullable<NonNullable<GatsbyTypes.StaticPageContentQuery['markdownRemark']>['frontmatter']>['blocks']
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
  NonNullable<GatsbyTypes.StaticPageContentQuery['markdownRemark']>['frontmatter']
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
