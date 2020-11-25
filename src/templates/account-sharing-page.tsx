import React from 'react'
import AlternatingImagesText, { BlockWithImage } from '../components/widgets/AlternatingImagesText'
import CardGrid, { Card } from '../components/widgets/CardGrid'
import { LayoutTemplate } from '../components/Layout'
import Container from '../components/common/Container'
import { graphql } from 'gatsby'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'

export default function AccountSharingPage({ data }: { data: GatsbyTypes.AccountSharingPageQuery }) {
  if (
    !data.markdownRemark?.frontmatter ||
    !data.markdownRemark?.frontmatter?.block1 ||
    !data.markdownRemark?.frontmatter?.cards
  ) {
    return
  }

  const title = data.markdownRemark.frontmatter.title ?? 'Default Title'
  const block = mapToBlockWithImage(data.markdownRemark.frontmatter.block1)
  const cards = mapToCards(data.markdownRemark.frontmatter.cards)

  return <AccountSharingPageTemplate title={title} block={block} cards={cards} />
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
        cards {
          icon {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          title
          content
        }
      }
    }
  }
`
interface TemplateProps {
  title: string
  block: BlockWithImage
  cards: Card[]
}
export function AccountSharingPageTemplate({ title, block, cards }: TemplateProps) {
  return (
    <LayoutTemplate siteMetadata={{ title: 'preview', description: 'desc', image: 'none', url: 'url' }}>
      <Container>
        <AlternatingImagesText title={title} blocks={[block]} />
        <CardGrid cards={cards} />
      </Container>
    </LayoutTemplate>
  )
}

export function AccountSharingPagePreview({ entry }: PreviewTemplateComponentProps) {
  const title = entry.getIn(['data', 'title']) as string
  const block = entry.getIn(['data', 'block1'])?.toObject() as QueryBlock
  const cards = entry.getIn(['data', 'cards'])?.toJS() as QueryCard

  return <AccountSharingPageTemplate title={title} block={mapToBlockWithImage(block)} cards={mapToCards(cards)} />
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

type QueryCard = NonNullable<NonNullable<GatsbyTypes.AccountSharingPageQuery['markdownRemark']>['frontmatter']>['cards']
function mapToCards(queryCard: QueryCard): Card[] {
  return (
    queryCard?.map((card) => ({
      icon: card?.icon,
      title: card?.title || '',
      content: card?.content || '',
    })) || []
  )
}
