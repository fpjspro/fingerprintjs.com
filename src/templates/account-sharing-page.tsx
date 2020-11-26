import React from 'react'
import AlternatingImagesText, { BlockWithImage } from '../components/widgets/AlternatingImagesText'
import { LayoutTemplate } from '../components/Layout'
import { graphql } from 'gatsby'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'

export default function AccountSharingPage({ data }: { data: GatsbyTypes.AccountSharingPageQuery }) {
  if (!data.markdownRemark?.frontmatter || !data.markdownRemark?.frontmatter?.block1) {
    return
  }

  const title = data.markdownRemark.frontmatter.title ?? 'Default Title'
  const block1 = mapToBlockWithImage(data.markdownRemark.frontmatter.block1)
  const block2 = mapToBlockWithImage(data.markdownRemark.frontmatter.block2)

  return <AccountSharingPageTemplate title={title} blocks={[block1, block2]} />
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
          imageAfterText
        }
        block2 {
          bullets
          subheader
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          imageAfterText
        }
      }
    }
  }
`
interface TemplateProps {
  title: string
  blocks: BlockWithImage[]
}
export function AccountSharingPageTemplate({ title, blocks }: TemplateProps) {
  return (
    <LayoutTemplate siteMetadata={{ title: 'preview', description: 'desc', image: 'none', url: 'url' }}>
      <AlternatingImagesText title={title} blocks={blocks} />
    </LayoutTemplate>
  )
}

export function AccountSharingPagePreview({ entry }: PreviewTemplateComponentProps) {
  const title = entry.getIn(['data', 'title']) as string
  const block1 = entry.getIn(['data', 'block1'])?.toObject() as QueryBlock
  const block2 = entry.getIn(['data', 'block2'])?.toObject() as QueryBlock

  return <AccountSharingPageTemplate title={title} blocks={[block1, block2].map(mapToBlockWithImage)} />
}

type QueryBlock = NonNullable<
  NonNullable<GatsbyTypes.AccountSharingPageQuery['markdownRemark']>['frontmatter']
>['block1']
function mapToBlockWithImage(queryBlock: QueryBlock): BlockWithImage {
  return {
    bullets: queryBlock?.bullets ?? [],
    image: queryBlock?.image,
    subTitle: queryBlock?.subheader ?? 'Default',
    imageAfterText: queryBlock?.imageAfterText ?? false,
  } as BlockWithImage
}
