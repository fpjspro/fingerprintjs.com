import { graphql, useStaticQuery } from 'gatsby'

const defaultMeta = {
  title: 'Default title',
  description: 'Default Description',
  url: 'default',
  siteUrl: 'default',
  image: 'default',
} as const

//TODO: [DI]: Use 'siteUrl' instead of 'url' here

const useSiteMetadata = () => {
  // It's an exception for CMS integration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { site } = useStaticQuery<GatsbyTypes.SITE_METADATA_QUERYQuery>(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
            url
            siteUrl
            image
          }
        }
      }
    `
  )

  return site?.siteMetadata ?? defaultMeta
}

export default useSiteMetadata
