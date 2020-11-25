import React from 'react'
import Hero from '../components/widgets/Hero'
import { LayoutTemplate } from '../components/Layout'
import { graphql } from 'gatsby'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'

export default function HeroPage({ data }: { data: GatsbyTypes.HeroPageQuery }) {
  if (!data.markdownRemark?.frontmatter) {
    return
  }

  const title = data.markdownRemark.frontmatter.title ?? 'Default Title'
  const description = data.markdownRemark.frontmatter.description ?? 'Default Title'
  const ctaText = data.markdownRemark.frontmatter.ctaText ?? 'Default Title'

  return <HeroPageTemplate title={title} description={description} ctaText={ctaText} />
}

export const pageQuery = graphql`
  query HeroPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        description
        ctaText
      }
    }
  }
`
interface TemplateProps {
  title: string
  description: string
  ctaText: string
}
export function HeroPageTemplate({ title, description, ctaText }: TemplateProps) {
  return (
    <LayoutTemplate siteMetadata={{ title: 'preview', description: 'desc', image: 'none', url: 'url' }}>
      <Hero title={title} description={description} ctaText={ctaText} />
    </LayoutTemplate>
  )
}

export function HeroPagePreview({ entry }: PreviewTemplateComponentProps) {
  const title = entry.getIn(['data', 'title']) as string
  const description = entry.getIn(['data', 'description']) as string
  const ctaText = entry.getIn(['data', 'ctaText']) as string

  return <HeroPageTemplate title={title} description={description} ctaText={ctaText} />
}
