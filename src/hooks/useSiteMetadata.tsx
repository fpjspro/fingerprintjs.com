import { graphql, useStaticQuery } from 'gatsby'

const defaultMeta = { title: 'Default title', description: 'Default Description' } as const

const useSiteMetadata = () => {
  //TODO: [DI]:  In CMS preview we can't use static queries, need workaround for that

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
            image
          }
        }
      }
    `
  )

  return site?.siteMetadata ?? defaultMeta
}

export default useSiteMetadata
