import { graphql } from 'gatsby'
import React from 'react'
import { LayoutTemplate } from '../components/Layout'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import Section from '../components/common/Section'
import Container from '../components/common/Container'
import { BASE_URL } from '../constants/content'
import Breadcrumbs, { Breadcrumb } from '../components/Breadcrumbs/Breadcrumbs'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../helpers/types'
import { withTrailingSlash } from '../helpers/url'
import { Content, DangerouslyRenderHtmlContent } from '../components/Content/Content'
import RelatedArticles from '../components/RelatedArticles/RelatedArticles'
import { mapToPost, PostProps } from '../components/Post/Post'
import PreviewProviders from '../cms/PreviewProviders'

import styles from './long-form-content.module.scss'
import AuthorComponent, { Author } from '../components/Author/Author'

interface LongFormContentContext extends GeneratedPageContext {
  authors: Author[]
}

interface LongFormContentProps {
  data: GatsbyTypes.LongFormContentQuery
  pageContext: LongFormContentContext
}
export default function LongFormContent({ data, pageContext }: LongFormContentProps) {
  if (
    data.markdownRemark?.frontmatter === undefined ||
    data.markdownRemark?.frontmatter?.metadata === undefined ||
    data.markdownRemark?.html === undefined
  ) {
    return null
  }

  const metadata = mapToMetadata(data.markdownRemark.frontmatter.metadata)
  const post = mapToPost(data.markdownRemark)
  const body = data.markdownRemark.html
  const publishDate = data.markdownRemark.frontmatter.publishDate

  return (
    <LongFormContentTemplate
      contentComponent={DangerouslyRenderHtmlContent}
      metadata={metadata}
      post={post}
      body={body}
      breadcrumbs={pageContext.breadcrumb.crumbs}
      authors={pageContext.authors}
      publishDate={publishDate}
    />
  )
}

export const pageQuery = graphql`
  query LongFormContent($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        metadata {
          title
          description
          url
          image {
            publicURL
          }
        }
        title
        tags
        featured
        publishDate
      }
    }
  }
`

export interface TemplateProps {
  metadata: GatsbyTypes.SiteSiteMetadata
  post: PostProps
  body: string | React.ReactNode
  contentComponent?: React.FunctionComponent<{ content: string | React.ReactNode; className?: string }>
  breadcrumbs?: Array<Breadcrumb>
  authors?: Author[]
  publishDate?: string
}
export function LongFormContentTemplate({
  metadata,
  post,
  body,
  contentComponent,
  breadcrumbs,
  authors = [],
}: TemplateProps) {
  const ContentComponent = contentComponent ?? Content

  return (
    <LayoutTemplate siteMetadata={metadata}>
      {breadcrumbs && (
        <>
          <BreadcrumbsSEO breadcrumbs={breadcrumbs} />
          <Container size='large'>
            <Breadcrumbs breadcrumbs={breadcrumbs.slice(1)} />
          </Container>
        </>
      )}

      <Section className={styles.root}>
        <Container size='small' className={styles.container}>
          <h1 className={styles.title}>{post.title}</h1>

          <div className={styles.authors}>
            {authors.map((author) => (
              <AuthorComponent key={author.name} author={author} className={styles.author} />
            ))}
          </div>

          <ContentComponent content={body} className={styles.content} />
        </Container>

        <Container>
          <RelatedArticles article={post} />
        </Container>
      </Section>
    </LayoutTemplate>
  )
}

export function LongFormContentPreview({ entry, widgetFor }: PreviewTemplateComponentProps) {
  const metadata = entry.getIn(['data', 'metadata'])?.toObject() as QueryMetadata

  return (
    <PreviewProviders>
      <LongFormContentTemplate
        metadata={mapToMetadata(metadata)}
        post={mapToPost({ frontmatter: entry.get('data').toObject() })}
        body={widgetFor('body') ?? <></>}
      />
    </PreviewProviders>
  )
}

type QueryMetadata = NonNullable<
  NonNullable<GatsbyTypes.LongFormContentQuery['markdownRemark']>['frontmatter']
>['metadata']
function mapToMetadata(queryMetadata: QueryMetadata): GatsbyTypes.SiteSiteMetadata {
  return {
    title: queryMetadata?.title ?? '',
    description: queryMetadata?.description ?? '',
    siteUrl: withTrailingSlash(queryMetadata?.url ?? ''),
    image: `${BASE_URL}${queryMetadata?.image?.publicURL}` ?? '',
  } as GatsbyTypes.SiteSiteMetadata
}
