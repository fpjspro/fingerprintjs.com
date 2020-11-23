const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const { data, errors } = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `)

  if (errors) {
    // eslint-disable-next-line no-console
    errors.forEach((e) => console.error(e.toString()))
    return Promise.reject(errors)
  }

  const posts = data.allMarkdownRemark.edges

  posts.forEach((edge) => {
    const id = edge.node.id

    createPage({
      path: edge.node.fields.slug,
      tags: edge.node.frontmatter.tags,
      component: path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`),
      // additional data can be passed via context
      context: {
        id,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
