import React from 'react'
import AlternatingImagesText, { BlockWithImage } from '../components/widgets/AlternatingImagesText'
import InlineCtaComponent, { InlineCta } from '../components/widgets/InlineCta'
import { LayoutTemplate } from '../components/Layout'
import Container from '../components/common/Container'
import { graphql } from 'gatsby'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'

export default function AccountSharingPage({ data }: { data: GatsbyTypes.AccountSharingPageQuery }) {
  if (
    !data.markdownRemark?.frontmatter ||
    !data.markdownRemark?.frontmatter?.block1 ||
    !data.markdownRemark?.frontmatter?.inlineCta
  ) {
    return <></>
  }

  const title = data.markdownRemark.frontmatter.title ?? 'Default Title'
  const block = mapToBlockWithImage(data.markdownRemark.frontmatter.block1)
  const inlineCta = mapToInlineCta(data.markdownRemark.frontmatter.inlineCta)

  return <AccountSharingPageTemplate title={title} block={block} inlineCta={inlineCta} />
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
  block: BlockWithImage
  inlineCta: InlineCta
}
export function AccountSharingPageTemplate({ title, block, inlineCta }: TemplateProps) {
  return (
    <LayoutTemplate siteMetadata={{ title: 'preview', description: 'desc', image: 'none', url: 'url' }}>
      <Container>
        <AlternatingImagesText title={title} blocks={[block]} />
        <InlineCtaComponent
          title={inlineCta.title}
          subtitle={inlineCta.subtitle}
          buttonText={inlineCta.buttonText}
          buttonHref={inlineCta.buttonHref}
        />
      </Container>
    </LayoutTemplate>
  )
}

export function AccountSharingPagePreview({ entry }: PreviewTemplateComponentProps) {
  const title = entry.getIn(['data', 'title']) as string
  const block = entry.getIn(['data', 'block1'])?.toObject() as QueryBlock
  const inlineCta = entry.getIn(['data', 'inlineCta'])?.toObject() as QueryInlineCta

  return (
    <AccountSharingPageTemplate
      title={title}
      block={mapToBlockWithImage(block)}
      inlineCta={mapToInlineCta(inlineCta)}
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
