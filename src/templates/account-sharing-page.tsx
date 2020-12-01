import React from 'react'
import AlternatingImagesText, { BlockWithImage } from '../components/widgets/AlternatingImagesText'
import InlineCtaComponent, { InlineCta } from '../components/widgets/InlineCta'
import { LayoutTemplate } from '../components/Layout'
import { graphql } from 'gatsby'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import Container from '../components/common/Container'

export default function AccountSharingPage({ data }: { data: GatsbyTypes.AccountSharingPageQuery }) {
  if (
    !data.markdownRemark?.frontmatter ||
    !data.markdownRemark?.frontmatter?.block1 ||
    !data.markdownRemark?.frontmatter?.inlineCta
  ) {
    return <></>
  }

  const title = data.markdownRemark.frontmatter.title ?? 'Default Title'
  const block1 = mapToBlockWithImage(data.markdownRemark.frontmatter.block1)
  const block2 = mapToBlockWithImage(data.markdownRemark.frontmatter.block2)
  const inlineCta = mapToInlineCta(data.markdownRemark.frontmatter.inlineCta)

  return <AccountSharingPageTemplate title={title} blocks={[block1, block2]} inlineCta={inlineCta} />
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
          isImageAfterText
          ctaText
          ctaUrl
          isCtaButton
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
interface TemplateProps {
  title: string
  blocks: BlockWithImage[]
  inlineCta: InlineCta
}
export function AccountSharingPageTemplate({ title, blocks, inlineCta }: TemplateProps) {
  return (
    <LayoutTemplate siteMetadata={{ title: 'preview', description: 'desc', image: 'none', url: 'url' }}>
      <Container>
        <AlternatingImagesText title={title} blocks={blocks} />
        <InlineCtaComponent {...inlineCta} />
      </Container>
    </LayoutTemplate>
  )
}

export function AccountSharingPagePreview({ entry }: PreviewTemplateComponentProps) {
  const title = entry.getIn(['data', 'title']) as string
  const block1 = entry.getIn(['data', 'block1'])?.toObject() as QueryBlock
  const block2 = entry.getIn(['data', 'block2'])?.toObject() as QueryBlock
  const inlineCta = entry.getIn(['data', 'inlineCta'])?.toObject() as QueryInlineCta

  return (
    <AccountSharingPageTemplate
      title={title}
      blocks={[block1, block2].map(mapToBlockWithImage)}
      inlineCta={mapToInlineCta(inlineCta)}
    />
  )
}

type QueryBlock = NonNullable<
  NonNullable<GatsbyTypes.AccountSharingPageQuery['markdownRemark']>['frontmatter']
>['block1']
function mapToBlockWithImage(queryBlock: QueryBlock): BlockWithImage {
  return {
    bullets: queryBlock?.bullets ?? [],
    image: queryBlock?.image,
    subTitle: queryBlock?.subheader ?? 'Default',
    isImageAfterText: queryBlock?.isImageAfterText ?? false,
    ctaText: queryBlock?.ctaText ?? 'Learn more',
    ctaUrl: queryBlock?.ctaUrl ?? 'https://fingerprintjs.com',
    isCtaButton: queryBlock?.isCtaButton ?? false,
  } as BlockWithImage
}

type QueryInlineCta = NonNullable<
  NonNullable<GatsbyTypes.AccountSharingPageQuery['markdownRemark']>['frontmatter']
>['inlineCta']
function mapToInlineCta(queryInlineCta: QueryInlineCta): InlineCta {
  return {
    title: queryInlineCta?.title || '',
    subtitle: queryInlineCta?.subtitle || '',
    buttonText: queryInlineCta?.buttonText || '',
    buttonHref: queryInlineCta?.buttonHref || '',
  } as InlineCta
}
