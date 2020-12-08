import { graphql, useStaticQuery } from 'gatsby'

export function useMainBackgroundImage() {
  const data = useStaticQuery(
    graphql`
      query {
        mainBackground: file(relativePath: { eq: "bg-full.png" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  )

  const mainBackground = data.mainBackground.childImageSharp.fluid

  return { mainBackground }
}
