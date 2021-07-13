import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import { ArrayElement } from '../../helpers/types'
import { mapToPost, PostProps } from '../Post/Post'
import PostGrid from '../PostGrid/PostGrid'

export interface RelatedArticlesProps {
  article: PostProps
  count?: number
  title?: string
  titleIsCentered?: boolean
  limitPostLines?: boolean
}
export default function RelatedArticles({
  article,
  count = 3,
  title,
  titleIsCentered,
  limitPostLines,
}: RelatedArticlesProps) {
  return (
    <StaticQuery<GatsbyTypes.RelatedArticlesQuery>
      query={relatedArticlesQuery}
      render={(data) => {
        const allArticles = data.allMarkdownRemark.edges.map(({ node }) => node)
        const relatedArticles = getRelatedArticles(article, allArticles, count)
        return relatedArticles.length > 0 ? (
          <PostGrid
            posts={relatedArticles}
            name={title ? title : 'Related Articles'}
            perRow='four'
            nameIsCentered={titleIsCentered}
            limitPostLines={limitPostLines}
          />
        ) : null
      }}
    />
  )
}

const relatedArticlesQuery = graphql`
  query RelatedArticles {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(blog)/.*\\.md$/" }
      }
      sort: { order: DESC, fields: frontmatter___publishDate }
      limit: 1000
    ) {
      ...PostData
    }
  }
`

type PostQuery = NonNullable<
  ArrayElement<NonNullable<NonNullable<GatsbyTypes.RelatedArticlesQuery['allMarkdownRemark']>['edges']>>['node']
>
function getRelatedArticles(referenceArticle: PostProps, allArticles: PostQuery[], count: number): PostProps[] {
  const relatedArticles = allArticles.map((article) => mapToPost(article))
  const { tags: referenceTags = [] } = referenceArticle
  const similarity: Record<string, number> = {}

  relatedArticles.forEach((article) => {
    const { path, tags = [], featured } = article

    // Check the number of tags the current article has in common with the reference article.
    similarity[path] = tags.filter((tag) => referenceTags.includes(tag)).length

    // Featured posts that have at least one tag in common should have a very high priority.
    if (featured && similarity[path] > 0) {
      similarity[path] += 50
    }
  })

  return relatedArticles
    .filter((article) => similarity[article.path] > 0 && article.path !== referenceArticle.path)
    .sort((a, b) => {
      return similarity[b.path] - similarity[a.path]
    })
    .slice(0, count)
}
