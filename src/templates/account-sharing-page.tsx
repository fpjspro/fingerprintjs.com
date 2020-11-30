import React from 'react'
import AlternatingImagesText, { BlockWithImage } from '../components/widgets/AlternatingImagesText'
import CardGrid, { Card } from '../components/widgets/CardGrid'
import SubHeaderComponent, { SubHeader } from '../components/widgets/SubHeader'
import CardSectionComponent, { CardSection } from '../components/widgets/CardSection'
import { LayoutTemplate } from '../components/Layout'
import Container from '../components/common/Container'
import { graphql } from 'gatsby'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import { ArrayElement } from '../helpers/types'

export default function AccountSharingPage({ data }: { data: GatsbyTypes.AccountSharingPageQuery }) {
  if (
    !data.markdownRemark?.frontmatter ||
    !data.markdownRemark?.frontmatter?.block1 ||
    !data.markdownRemark?.frontmatter?.subHeader ||
    !data.markdownRemark?.frontmatter?.cards ||
    !data.markdownRemark?.frontmatter?.cardSection
  ) {
    return
  }

  const title = data.markdownRemark.frontmatter.title ?? 'Default Title'
  const block = mapToBlockWithImage(data.markdownRemark.frontmatter.block1)
  const subHeader = mapToSubHeader(data.markdownRemark.frontmatter.subHeader)
  const cards = mapToCards(data.markdownRemark.frontmatter.cards as QueryCard[])
  const cardSection = mapToCardSection(data.markdownRemark.frontmatter.cardSection)

  return (
    <AccountSharingPageTemplate
      title={title}
      block={block}
      subHeader={subHeader}
      cards={cards}
      cardSection={cardSection}
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
          bullets
          subheader
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        subHeader {
          title
          subtitle
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
      }
    }
  }
`
interface TemplateProps {
  title: string
  block: BlockWithImage
  subHeader: SubHeader
  cards: Card[]
  cardSection: CardSection
}
export function AccountSharingPageTemplate({ title, block, subHeader, cards, cardSection }: TemplateProps) {
  return (
    <LayoutTemplate siteMetadata={{ title: 'preview', description: 'desc', image: 'none', url: 'url' }}>
      <Container>
        <AlternatingImagesText title={title} blocks={[block]} />
        <SubHeaderComponent title={subHeader.title} subtitle={subHeader.subtitle} />
        <CardGrid cards={cards} />
        {/* TODO Maybe change to {...cardSection}? */}
        <CardSectionComponent title={cardSection.title} subtitle={cardSection.subtitle} cards={cardSection.cards} />
      </Container>
    </LayoutTemplate>
  )
}

export function AccountSharingPagePreview({ entry }: PreviewTemplateComponentProps) {
  const title = entry.getIn(['data', 'title']) as string
  const block = entry.getIn(['data', 'block1'])?.toObject() as QueryBlock
  const subHeader = entry.getIn(['data', 'subHeader'])?.toObject() as QuerySubHeader
  const cards = entry.getIn(['data', 'cards'])?.toJS() as QueryCard[]

  let cardSection = entry.getIn(['data', 'cardSection'])?.toObject()
  if (cardSection?.cards) {
    cardSection.cards = entry.getIn(['data', 'cardSection', 'cards'])?.toJS()
  }
  cardSection = cardSection as QueryCardSection

  return (
    <AccountSharingPageTemplate
      title={title}
      block={mapToBlockWithImage(block)}
      subHeader={mapToSubHeader(subHeader)}
      cards={mapToCards(cards)}
      cardSection={mapToCardSection(cardSection)}
    />
  )
}

type QueryBlock = NonNullable<
  NonNullable<GatsbyTypes.AccountSharingPageQuery['markdownRemark']>['frontmatter']
>['block1']
function mapToBlockWithImage(queryBlocK: QueryBlock): BlockWithImage {
  return {
    bullets: queryBlocK?.bullets ?? [],
    image: queryBlocK?.image,
    subTitle: queryBlocK?.subheader ?? 'Default',
  } as BlockWithImage
}

type QuerySubHeader = NonNullable<
  NonNullable<GatsbyTypes.AccountSharingPageQuery['markdownRemark']>['frontmatter']
>['header']
function mapToSubHeader(queryHeader: QuerySubHeader): SubHeader {
  return {
    title: queryHeader?.title ?? '',
    subtitle: queryHeader?.subtitle ?? '',
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
