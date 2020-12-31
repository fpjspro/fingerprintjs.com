import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import { ArrayElement } from '../../helpers/types'
import { mapToPost, PostProps } from '../Post/Post'
import PostGrid from '../PostGrid/PostGrid'

export interface RelatedArticlesProps {
  article: PostProps
  count?: number
}
export default function RelatedArticles({ article, count = 3 }: RelatedArticlesProps) {
  return (
    <StaticQuery<GatsbyTypes.RelatedArticlesQuery>
      query={relatedArticlesQuery}
      render={(data) => {
        const allArticles = data.allMarkdownRemark.edges.map(({ node }) => node)
        return <PostGrid posts={getRelatedArticles(article, allArticles, count)} name='Related Articles' narrow />
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
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            metadata {
              title
              description
              image {
                childImageSharp {
                  fluid(maxWidth: 512, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              url
            }
            title
            publishDate
            tags
            featured
          }
        }
      }
    }
  }
`

type PostQuery = NonNullable<
  ArrayElement<NonNullable<NonNullable<GatsbyTypes.RelatedArticlesQuery['allMarkdownRemark']>['edges']>>['node']
>
function getRelatedArticles(referenceArticle: PostProps, allArticles: PostQuery[], count: number): PostProps[] {
  const relatedArticles = allArticles.map(mapToPost)
  const { tags: referenceTags = [] } = referenceArticle
  const similarity: Record<string, number> = {}

  relatedArticles.forEach((article) => {
    const { path, tags = [], featured } = article

    similarity[path] = tags.filter((tag) => referenceTags.includes(tag)).length

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
