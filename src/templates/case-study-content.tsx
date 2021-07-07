import { graphql } from 'gatsby'
import React from 'react'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import { DangerouslyRenderHtmlContent, MarkdownContent } from '../components/Content/Content'
import Header, { HeaderProps } from '../components/widgets/StudyCase/Header/Header'
import Summary, { SummaryProps, Result, OverviewBullet } from '../components/widgets/StudyCase/Summary/Summary'
import { LayoutTemplate } from '../components/Layout'
import { GeneratedPageContext } from '../helpers/types'
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
    data.markdownRemark?.frontmatter?.header === undefined ||
    data.markdownRemark?.frontmatter?.summary === undefined
  ) {
    return null
  }

  const metadata = mapToMetadata(data.markdownRemark.frontmatter.metadata)
  const header = mapToHeader(data.markdownRemark.frontmatter.header)
  const summary = mapToSummary(data.markdownRemark.frontmatter.summary)

  return (
    <CaseStudyContentTemplate
      metadata={metadata}
      header={header}
      summary={summary}
      breadcrumbs={pageContext.breadcrumb.crumbs}
    />
  )
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
          pdf {
            publicURL
          }
        }
        summary {
          results {
            icon {
              childImageSharp {
                fixed(width: 28, quality: 100) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
              extension
              publicURL
            }
            iconAlt
            iconTitle
            title
            markdown__Content
          }
          overviewSection {
            description
            bullets {
              value
              description
            }
          }
        }
      }
    }
  }
`

export interface CaseStudyTemplateProps {
  metadata: GatsbyTypes.SiteSiteMetadata
  header: HeaderProps
  summary: SummaryProps
  breadcrumbs?: Array<Breadcrumb>
}
export function CaseStudyContentTemplate({ metadata, header, summary, breadcrumbs }: CaseStudyTemplateProps) {
  return (
    <LayoutTemplate siteMetadata={metadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <Section className={styles.section}>
        <Header {...header} />
        <Summary {...summary} />
      </Section>
    </LayoutTemplate>
  )
}

export function CaseStudyContentPreview({ entry }: PreviewTemplateComponentProps) {
  const metadata = entry.getIn(['data', 'metadata'])?.toObject() as QueryMetadata
  const header = entry.getIn(['data', 'header'])?.toObject() as QueryHeader
  const summary = entry.getIn(['data', 'summary'])?.toJS() as QuerySummary

  return (
    <PreviewProviders>
      <CaseStudyContentTemplate
        metadata={mapToMetadata(metadata)}
        header={mapToHeader(header, true)}
        summary={mapToSummary(summary, true)}
      />
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
    pdfLink: queryHeader?.pdf?.publicURL ?? '/',
  } as HeaderProps
}

type QuerySummary = NonNullable<
  NonNullable<GatsbyTypes.CaseStudyContentQuery['markdownRemark']>['frontmatter']
>['summary']
function mapToSummary(querySummary: QuerySummary, preview = false): SummaryProps {
  return {
    results:
      querySummary?.results?.map(
        (result) =>
          ({
            icon: result?.icon,
            iconAlt: result?.iconAlt,
            iconTitle: result?.iconTitle,
            title: result?.title ?? `Nunc rhoncus et eros non lobortis.`,
            children: preview ? (
              <MarkdownContent
                markdown={
                  result?.markdown__Content ??
                  'Sed ut fermentum dolor. Vivamus pulvinar nisi leo, in accumsan diam pretium id. Vestibulum aliquam posuere enim, sed finibus sapien fringilla pharetra. Ut sollicitudin nunc non dui placerat facilisis. Duis neque turpis, dictum sit amet sagittis ut, finibus ac eros. Cras pulvinar laoreet diam vel lacinia.'
                }
              />
            ) : (
              <DangerouslyRenderHtmlContent content={result?.markdown__Content ?? ''} />
            ),
          } as Result)
      ) ?? [],
    description:
      querySummary?.overviewSection?.description ?? 'Vivamus at ex a mi bibendum sollicitudin sit amet laoreet mi.',
    bullets:
      querySummary?.overviewSection?.bullets?.map(
        (bullet) =>
          ({
            value: bullet?.value ?? `Vivamus`,
            description: bullet?.description ?? `Lobortis`,
          } as OverviewBullet)
      ) ?? [],
  } as SummaryProps
}
