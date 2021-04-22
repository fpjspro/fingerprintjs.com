import { graphql } from 'gatsby'
import React from 'react'
import { DangerouslyRenderHtmlContent, MarkdownContent } from '../components/Content/Content'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import InlineCta, { InlineCtaProps } from '../components/widgets/InlineCta'
import Hero, { HeroProps } from '../components/widgets/Hero'
import { LayoutTemplate } from '../components/Layout'
import { ArrayElement, GeneratedPageContext } from '../helpers/types'
import AlternatingImagesText, { BlockWithImage } from '../components/widgets/AlternatingImagesText'
import CardSection, { CardSectionProps } from '../components/widgets/CardSection'
import { Card } from '../components/widgets/CardGrid'
import { BASE_URL } from '../constants/content'
import Section from '../components/common/Section'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import { withTrailingSlash } from '../helpers/url'
import { Breadcrumb } from '../components/Breadcrumbs/Breadcrumbs'
import PreviewProviders from '../cms/PreviewProviders'

import styles from './static-page-content.module.scss'

// Each widget has different styles and the MarkdownContent component is not aware of that, so we need to pass a widget class to MarkdownContent.
// TODO [VL] When we have consistent typography, we can create variants for the markdown component instead of overriding styles for each widget.
import ctaStyles from '../components/widgets/InlineCta/InlineCta.module.scss'
import cardStyles from '../components/widgets/CardGrid/CardGrid.module.scss'
import blockStyles from '../components/widgets/AlternatingImagesText/AlternatingImagesText.module.scss'

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
          openCtaNewTab
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
            markdown__Content
          }
        }
        blocks {
          markdown__Content
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
          markdown__Subtitle
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
  inlineCta: InlineCtaProps
  cardSection: CardSectionProps
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
            {blocks.length > 0 && <AlternatingImagesText title={''} blocks={blocks} className={styles.widget} />}
            <CardSection {...cardSection} className={styles.widget} />
          </>
        ) : (
          <>
            <CardSection {...cardSection} className={styles.widget} />
            {blocks.length > 0 && <AlternatingImagesText title={''} blocks={blocks} className={styles.widget} />}
          </>
        )}
        <InlineCta {...inlineCta} />
      </Section>
    </LayoutTemplate>
  )
}

export function StaticPageContentPreview({ entry }: PreviewTemplateComponentProps) {
  const metadata = entry.getIn(['data', 'metadata'])?.toObject() as QueryMetadata
  const invertContent = entry.getIn(['data', 'invertContent'])

  let cardSection = entry.getIn(['data', 'cardSection'])?.toObject()
  if (cardSection?.cards) {
    cardSection.cards = entry.getIn(['data', 'cardSection', 'cards'])?.toJS()
  }
  cardSection = cardSection as QueryCardSection

  const blocks = entry.getIn(['data', 'blocks'])?.toJS() as QueryBlock[]

  const inlineCta = entry.getIn(['data', 'inlineCta'])?.toObject() as QueryInlineCta

  const hero = entry.getIn(['data', 'hero'])?.toObject() as QueryHero

  return (
    <PreviewProviders>
      <StaticPageContentTemplate
        metadata={mapToMetadata(metadata)}
        invertContent={invertContent}
        inlineCta={mapToInlineCta(inlineCta, true)}
        cardSection={mapToCardSection(cardSection, true)}
        blocks={mapToBlocks(blocks, true)}
        hero={mapToHero(hero)}
      />
    </PreviewProviders>
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
    openCtaNewTab: queryHero?.openCtaNewTab ?? false,
  } as HeroProps
}

type QueryCardSection = NonNullable<
  NonNullable<GatsbyTypes.StaticPageContentQuery['markdownRemark']>['frontmatter']
>['cardSection']
function mapToCardSection(queryCardSection: QueryCardSection, preview = false): CardSectionProps {
  return {
    title: queryCardSection?.title ?? 'Vivamus at ex a mi bibendum sollicitudin sit amet laoreet mi.',
    subtitle: queryCardSection?.subtitle ?? '',
    cards:
      queryCardSection?.cards?.map(
        (card, index) =>
          ({
            icon: card?.icon,
            title: card?.title ?? `Nunc rhoncus et eros non lobortis. #${index}`,
            content: preview ? (
              <MarkdownContent
                markdown={
                  card?.markdown__Content ??
                  'Sed ut fermentum dolor. Vivamus pulvinar nisi leo, in accumsan diam pretium id. Vestibulum aliquam posuere enim, sed finibus sapien fringilla pharetra. Ut sollicitudin nunc non dui placerat facilisis. Duis neque turpis, dictum sit amet sagittis ut, finibus ac eros. Cras pulvinar laoreet diam vel lacinia.'
                }
                className={cardStyles.content}
              />
            ) : (
              <DangerouslyRenderHtmlContent content={card?.markdown__Content ?? ''} className={cardStyles.content} />
            ),
          } as Card)
      ) ?? [],
  } as CardSectionProps
}

type QueryBlock = ArrayElement<
  NonNullable<NonNullable<GatsbyTypes.StaticPageContentQuery['markdownRemark']>['frontmatter']>['blocks']
>
function mapToBlocks(queryBlocks: QueryBlock[], preview = false): BlockWithImage[] {
  return (
    queryBlocks?.map(
      (block, index) =>
        ({
          content: preview ? (
            <MarkdownContent
              markdown={
                block?.markdown__Content ??
                'Sed ut fermentum dolor. Vivamus pulvinar nisi leo, in accumsan diam pretium id. Vestibulum aliquam posuere enim, sed finibus sapien fringilla pharetra. Ut sollicitudin nunc non dui placerat facilisis. Duis neque turpis, dictum sit amet sagittis ut, finibus ac eros. Cras pulvinar laoreet diam vel lacinia.'
              }
              className={blockStyles.content}
            />
          ) : (
            <DangerouslyRenderHtmlContent content={block?.markdown__Content ?? ''} className={blockStyles.content} />
          ),
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
function mapToInlineCta(queryInlineCta: QueryInlineCta, preview = false): InlineCtaProps {
  return {
    title: queryInlineCta?.title ?? 'Quisque arcu urna, tempor aliquet mi eget.',
    subtitle: preview ? (
      <MarkdownContent
        markdown={
          queryInlineCta?.markdown__Subtitle ??
          'Curabitur sollicitudin id mi ac ultrices. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas in ex turpis.'
        }
        className={ctaStyles.content}
      />
    ) : (
      <DangerouslyRenderHtmlContent content={queryInlineCta?.markdown__Subtitle ?? ''} className={ctaStyles.content} />
    ),
    primaryAction: { name: queryInlineCta?.buttonText ?? 'Lorem ipsum', action: queryInlineCta?.buttonHref ?? '/' },
  } as InlineCtaProps
}
