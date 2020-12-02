import React from 'react'
import AlternatingImagesText, { BlockWithImage } from '../components/widgets/AlternatingImagesText'
import CardGrid, { Card } from '../components/widgets/CardGrid'
import SubHeaderComponent, { SubHeader } from '../components/widgets/SubHeader'
import CardSectionComponent, { CardSection } from '../components/widgets/CardSection'
import { LayoutTemplate } from '../components/Layout'
import { graphql } from 'gatsby'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import { ArrayElement } from '../helpers/types'
import InlineCtaComponent, { InlineCta } from '../components/widgets/InlineCta'
import Container from '../components/common/Container'
import Hero from '../components/widgets/Hero'

export default function AccountSharingPage({ data }: { data: GatsbyTypes.AccountSharingPageQuery }) {
  if (
    !data.markdownRemark?.frontmatter ||
    !data.markdownRemark?.frontmatter?.block1 ||
    !data.markdownRemark?.frontmatter?.block2 ||
    !data.markdownRemark?.frontmatter?.subHeader ||
    !data.markdownRemark?.frontmatter?.cards ||
    !data.markdownRemark?.frontmatter?.cardSection ||
    !data.markdownRemark?.frontmatter?.inlineCta
  ) {
    return <></>
  }

  const title = data.markdownRemark.frontmatter.title ?? 'Default Title'
  const block1 = mapToBlockWithImage(data.markdownRemark.frontmatter.block1)
  const block2 = mapToBlockWithImage(data.markdownRemark.frontmatter.block2)
  const subHeader = mapToSubHeader(data.markdownRemark.frontmatter.subHeader)
  const cards = mapToCards(data.markdownRemark.frontmatter.cards as QueryCard[])
  const cardSection = mapToCardSection(data.markdownRemark.frontmatter.cardSection)
  const inlineCta = mapToInlineCta(data.markdownRemark.frontmatter.inlineCta)

  return (
    <AccountSharingPageTemplate
      title={title}
      blocks={[block1, block2]}
      subHeader={subHeader}
      cards={cards}
      cardSection={cardSection}
      inlineCta={inlineCta}
    />
  )
}

export const pageQuery = graphql`
  query AccountSharingPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        block1 {
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
        block2 {
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
        subHeader {
          title
          titleSize
          subtitle
          subtitleSize
          align
        }
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
interface TemplateProps {
  title: string
  blocks: BlockWithImage[]
  subHeader: SubHeader
  cards: Card[]
  cardSection: CardSection
  inlineCta: InlineCta
}
export function AccountSharingPageTemplate({ title, blocks, subHeader, cards, cardSection, inlineCta }: TemplateProps) {
  return (
    <LayoutTemplate siteMetadata={{ title: 'preview', description: 'desc', image: 'none', url: 'url' }}>
      <Container>
        <Hero
          title='Some title for the hero component'
          description='Can also have a description'
          ctaText='Button!'
          ctaHref='/'
        />
        <AlternatingImagesText title={title} blocks={blocks} />
        <SubHeaderComponent {...subHeader} />
        <CardGrid cards={cards} />
        <CardSectionComponent {...cardSection} />
        <InlineCtaComponent {...inlineCta} />
      </Container>
    </LayoutTemplate>
  )
}

export function AccountSharingPagePreview({ entry }: PreviewTemplateComponentProps) {
  const title = entry.getIn(['data', 'title']) as string
  const block1 = entry.getIn(['data', 'block1'])?.toObject() as QueryBlock
  const block2 = entry.getIn(['data', 'block2'])?.toObject() as QueryBlock
  const subHeader = entry.getIn(['data', 'subHeader'])?.toObject() as QuerySubHeader
  const cards = entry.getIn(['data', 'cards'])?.toJS() as QueryCard[]

  let cardSection = entry.getIn(['data', 'cardSection'])?.toObject()
  if (cardSection?.cards) {
    cardSection.cards = entry.getIn(['data', 'cardSection', 'cards'])?.toJS()
  }
  cardSection = cardSection as QueryCardSection
  const inlineCta = entry.getIn(['data', 'inlineCta'])?.toObject() as QueryInlineCta

  return (
    <AccountSharingPageTemplate
      title={title}
      blocks={[block1, block2].map(mapToBlockWithImage)}
      subHeader={mapToSubHeader(subHeader)}
      cards={mapToCards(cards)}
      cardSection={mapToCardSection(cardSection)}
      inlineCta={mapToInlineCta(inlineCta)}
    />
  )
}

type QueryBlock = NonNullable<
  NonNullable<GatsbyTypes.AccountSharingPageQuery['markdownRemark']>['frontmatter']
>['block1']
function mapToBlockWithImage(queryBlock: QueryBlock): BlockWithImage {
  return {
    content: queryBlock?.content ?? [],
    image: queryBlock?.image,
    subTitle: queryBlock?.subheader ?? 'Default',
    isImageAfterText: queryBlock?.isImageAfterText ?? false,
    ctaText: queryBlock?.ctaText ?? 'Learn more',
    ctaUrl: queryBlock?.ctaUrl ?? 'https://fingerprintjs.com',
    isCtaButton: queryBlock?.isCtaButton ?? false,
  } as BlockWithImage
}

type QuerySubHeader = NonNullable<
  NonNullable<GatsbyTypes.AccountSharingPageQuery['markdownRemark']>['frontmatter']
>['subHeader']
function mapToSubHeader(queryHeader: QuerySubHeader): SubHeader {
  return {
    title: queryHeader?.title ?? '',
    titleSize: queryHeader?.titleSize ?? 'large',
    subtitle: queryHeader?.subtitle ?? '',
    subtitleSize: queryHeader?.subtitleSize ?? 'medium',
    align: queryHeader?.align ?? 'center',
  } as SubHeader
}

type QueryCard = ArrayElement<
  NonNullable<NonNullable<GatsbyTypes.AccountSharingPageQuery['markdownRemark']>['frontmatter']>['cards']
>
function mapToCards(queryCard: QueryCard[]): Card[] {
  return (
    queryCard?.map(
      (card) =>
        ({
          icon: card?.icon,
          title: card?.title ?? '',
          content: card?.content ?? '',
        } as Card)
    ) || []
  )
}

type QueryCardSection = NonNullable<
  NonNullable<GatsbyTypes.AccountSharingPageQuery['markdownRemark']>['frontmatter']
>['cardSection']
function mapToCardSection(queryCardSection: QueryCardSection): CardSection {
  return {
    title: queryCardSection?.title ?? '',
    subtitle: queryCardSection?.subtitle ?? '',
    cards: mapToCards(queryCardSection?.cards as QueryCard[]),
  } as CardSection
}

type QueryInlineCta = NonNullable<
  NonNullable<GatsbyTypes.AccountSharingPageQuery['markdownRemark']>['frontmatter']
>['inlineCta']
function mapToInlineCta(queryInlineCta: QueryInlineCta): InlineCta {
  return {
    title: queryInlineCta?.title ?? '',
    subtitle: queryInlineCta?.subtitle ?? '',
    buttonText: queryInlineCta?.buttonText ?? '',
    buttonHref: queryInlineCta?.buttonHref ?? '',
  } as InlineCta
}
