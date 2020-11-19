import { graphql, useStaticQuery } from 'gatsby'
import { isBrowser } from '../utils/ssr_detector'

const defaultMeta = { title: 'Default title', description: 'Default Description' } as const

const useSiteMetadata = () => {
  // In CMS preview we can't use static queries
  if (isBrowser()) {
    return defaultMeta
  }

  // It's an exception for CMS integration
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { site } = useStaticQuery<GatsbyTypes.SITE_METADATA_QUERYQuery>(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  )

  return site?.siteMetadata ?? defaultMeta
}

export default useSiteMetadata
