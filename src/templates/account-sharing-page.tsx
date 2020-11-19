import React from 'react'
import AlternatingImagesText, { BlockWithImage } from '../components/widgets/AlternatingImagesText'
import Layout from '../components/Layout'
import Container from '../components/common/Container'
import { graphql } from 'gatsby'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'

export default function AccountSharingPage({ data }: { data: GatsbyTypes.AccountSharingPageQuery }) {
  if (!data.markdownRemark?.frontmatter || !data.markdownRemark?.frontmatter?.block1) {
    return
  }

  const title = data.markdownRemark.frontmatter.title ?? 'Default Title'
  const block = mapToBlockWithImage(data.markdownRemark.frontmatter.block1)

  return <AccountSharingPageTemplate title={title} block={block} />
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
      }
    }
  }
`
interface TemplateProps {
  title: string
  block: BlockWithImage
}
export function AccountSharingPageTemplate({ title, block }: TemplateProps) {
  return (
    <Layout>
      <Container>
        <AlternatingImagesText title={title} blocks={[block]} />
      </Container>
    </Layout>
  )
}

export function AccountSharingPagePreview({ entry }: PreviewTemplateComponentProps) {
  const title = entry.getIn(['data', 'title']) as string
  const block = entry.getIn(['data', 'block1']).toObject() as QueryBlock

  return <AccountSharingPageTemplate title={title} block={mapToBlockWithImage(block)} />
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
