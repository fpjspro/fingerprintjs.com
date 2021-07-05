import { graphql } from 'gatsby'
import React from 'react'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import { DangerouslyRenderHtmlContent, MarkdownContent } from '../components/Content/Content'
import Header, { HeaderProps } from '../components/widgets/StudyCase/Header/Header'
import { LayoutTemplate } from '../components/Layout'
import { GeneratedPageContext } from '../helpers/types'
import { BASE_URL } from '../constants/content'
import Section from '../components/common/Section'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import { withTrailingSlash } from '../helpers/url'
import { Breadcrumb } from '../components/Breadcrumbs/Breadcrumbs'
import PreviewProviders from '../cms/PreviewProviders'

import styles from './case-study-content.module.scss'

import headerStyles from '../components/widgets/StudyCase/Header/Header.module.scss'

interface CaseStudyContentProps {
  data: GatsbyTypes.CaseStudyContentQuery
  pageContext: GeneratedPageContext
}

export default function CaseStudyContent({ data, pageContext }: CaseStudyContentProps) {
  if (
    data.markdownRemark?.frontmatter === undefined ||
    data.markdownRemark?.frontmatter?.metadata === undefined ||
    data.markdownRemark?.frontmatter?.header === undefined
  ) {
    return null
  }

  const metadata = mapToMetadata(data.markdownRemark.frontmatter.metadata)
  const header = mapToHeader(data.markdownRemark.frontmatter.header)

  return <CaseStudyContentTemplate metadata={metadata} header={header} breadcrumbs={pageContext.breadcrumb.crumbs} />
}

export const pageQuery = graphql`
  query CaseStudyContent($id: String!) {
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
          markdown__Content
        }
      }
    }
  }
`

export interface CaseStudyTemplateProps {
  metadata: GatsbyTypes.SiteSiteMetadata
  header: HeaderProps
  breadcrumbs?: Array<Breadcrumb>
}
export function CaseStudyContentTemplate({ metadata, header, breadcrumbs }: CaseStudyTemplateProps) {
  return (
    <LayoutTemplate siteMetadata={metadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <Section className={styles.section}>
        <Header {...header} />
      </Section>
    </LayoutTemplate>
  )
}

export function CaseStudyContentPreview({ entry }: PreviewTemplateComponentProps) {
  const metadata = entry.getIn(['data', 'metadata'])?.toObject() as QueryMetadata
  const header = entry.getIn(['data', 'header'])?.toObject() as QueryHeader

  return (
    <PreviewProviders>
      <CaseStudyContentTemplate metadata={mapToMetadata(metadata)} header={mapToHeader(header)} />
    </PreviewProviders>
  )
}

type QueryMetadata = NonNullable<
  NonNullable<GatsbyTypes.CaseStudyContentQuery['markdownRemark']>['frontmatter']
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
  NonNullable<GatsbyTypes.CaseStudyContentQuery['markdownRemark']>['frontmatter']
>['header']
function mapToHeader(queryHeader: QueryHeader, preview = false): HeaderProps {
  return {
    subLabel: queryHeader?.subLabel ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    subTitle:
      queryHeader?.subTitle ??
      'Vestibulum ut mi eleifend, auctor ligula ut, feugiat nunc. Donec molestie ipsum at sagittis elementum.',
    description: preview ? (
      <MarkdownContent
        markdown={
          queryHeader?.markdown__Content ??
          'Curabitur sollicitudin id mi ac ultrices. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas in ex turpis.'
        }
        className={headerStyles.content}
      />
    ) : (
      <DangerouslyRenderHtmlContent content={queryHeader?.markdown__Content ?? ''} className={headerStyles.content} />
    ),
  } as HeaderProps
}
