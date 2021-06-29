import { graphql } from 'gatsby'
import React from 'react'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import Header, { HeaderProps } from '../components/widgets/StudyCase/Header/Header'
import { LayoutTemplate } from '../components/Layout'
import { GeneratedPageContext } from '../helpers/types'
import { BASE_URL } from '../constants/content'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import { withTrailingSlash } from '../helpers/url'
import { Breadcrumb } from '../components/Breadcrumbs/Breadcrumbs'
import PreviewProviders from '../cms/PreviewProviders'

interface CaseStudiesContentProps {
  data: GatsbyTypes.CaseStudiesContentQuery
  pageContext: GeneratedPageContext
}
// fix
export default function CaseStudyContent({ data, pageContext }: CaseStudiesContentProps) {
  if (
    data.markdownRemark?.frontmatter === undefined ||
    data.markdownRemark?.frontmatter?.metadata === undefined ||
    data.markdownRemark?.frontmatter?.header === undefined
  ) {
    return null
  }

  const metadata = mapToMetadata(data.markdownRemark.frontmatter.metadata)
  const header = mapToHeader(data.markdownRemark.frontmatter.header)

  return <CaseStudiesContentTemplate metadata={metadata} header={header} breadcrumbs={pageContext.breadcrumb.crumbs} />
}

export const pageQuery = graphql`
  query CaseStudiesContent($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        metadata {
          title
          description
          url
        }
        header {
          subLabel
          subTitle
          description
        }
      }
    }
  }
`

export interface CaseStudiesTemplateProps {
  metadata: GatsbyTypes.SiteSiteMetadata
  header: HeaderProps
  breadcrumbs?: Array<Breadcrumb>
}
export function CaseStudiesContentTemplate({ metadata, header, breadcrumbs }: CaseStudiesTemplateProps) {
  return (
    <LayoutTemplate siteMetadata={metadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <Header {...header} />
    </LayoutTemplate>
  )
}

export function CaseStudiesContentPreview({ entry }: PreviewTemplateComponentProps) {
  const metadata = entry.getIn(['data', 'metadata'])?.toObject() as QueryMetadata
  const header = entry.getIn(['data', 'header'])?.toObject() as QueryHeader

  return (
    <PreviewProviders>
      <CaseStudiesContentTemplate metadata={mapToMetadata(metadata)} header={mapToHeader(header)} />
    </PreviewProviders>
  )
}

type QueryMetadata = NonNullable<
  NonNullable<GatsbyTypes.CaseStudiesContentQuery['markdownRemark']>['frontmatter']
>['metadata']
function mapToMetadata(queryMetadata: QueryMetadata): GatsbyTypes.SiteSiteMetadata {
  return {
    title: queryMetadata?.title ?? '',
    description: queryMetadata?.description ?? '',
    siteUrl: withTrailingSlash(queryMetadata?.url ?? ''),
    image: `${BASE_URL}${queryMetadata?.image?.publicURL}` ?? '',
  } as GatsbyTypes.SiteSiteMetadata
}

type QueryHeader = NonNullable<
  NonNullable<GatsbyTypes.CaseStudiesContentQuery['markdownRemark']>['frontmatter']
>['header']
function mapToHeader(queryHeader: QueryHeader): HeaderProps {
  return {
    subLabel: queryHeader?.title ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    subTitle:
      queryHeader?.description ??
      'Vestibulum ut mi eleifend, auctor ligula ut, feugiat nunc. Donec molestie ipsum at sagittis elementum.',
    description: queryHeader?.ctaText ?? 'Lorem ipsum',
  } as HeaderProps
}
