// eslint can't know something inside a query is a regex and complains about escaping.
/* eslint no-useless-escape: 0 */

const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const remark = require('remark')
const remarkHTML = require('remark-html')

async function getFolderEdges(folder, graphql, filter = '') {
  const { data, errors } = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        filter: {
          fileAbsolutePath: {regex: "/(${folder})/.*\.md$/"}
          ${filter}
        }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              metadata {
                url
              }
              authors
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

  return data.allMarkdownRemark.edges
}

async function getTags(graphql) {
  const { data, errors } = await graphql(`
    {
      allMarkdownRemark {
        group(field: frontmatter___tags) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `)

  if (errors) {
    // eslint-disable-next-line no-console
    errors.forEach((e) => console.error(e.toString()))
    return Promise.reject(errors)
  }

  return data.allMarkdownRemark.group
}

function withTrailingSlash(path) {
  return path.endsWith('/') ? path : `${path}/`
}

function getRelativeUrl(url) {
  const relativeUrl = url.match(/fingerprintjs.com(\/.*)$/)
  return relativeUrl ? withTrailingSlash(relativeUrl[1]) : '/'
}

function createPageFromEdge(edge, createPage, additionalContext = {}) {
  const id = edge.node.id
  const url = edge.node.frontmatter.metadata?.url

  createPage({
    path: url ? getRelativeUrl(url) : edge.node.fields.slug,
    tags: edge.node.frontmatter.tags,
    component: path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.tsx`),
    // additional data can be passed via context
    context: {
      id,
      ...additionalContext,
    },
  })
}

function createPaginatedPages(numPages, itemsPerPage, pathname, template, createPage, additionalContext = {}) {
  for (let i = 0; i < numPages; ++i) {
    createPage({
      // The first page doesn't need a number.
      path: `${pathname}${i === 0 ? '/' : `/${i + 1}/`}`,
      component: path.resolve(template),
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPage: i + 1,
        ...additionalContext,
      },
    })
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const pages = await getFolderEdges('index', graphql)
  pages.forEach((edge) => createPageFromEdge(edge, createPage))

  const blogPosts = await getFolderEdges('blog', graphql)
  blogPosts.forEach((edge) => createPageFromEdge(edge, createPage))

  const caseStudies = await getFolderEdges('case-study', graphql)
  caseStudies.forEach((edge) => createPageFromEdge(edge, createPage))

  const featuredPosts = await getFolderEdges('blog', graphql, 'frontmatter: { featured: { eq: true } }')

  const postsPerPage = 12

  const numBlogPages = Math.ceil(blogPosts.length / postsPerPage)
  createPaginatedPages(numBlogPages, postsPerPage, 'blog', 'src/templates/blog.tsx', createPage)

  const numCaseStudyPages = Math.ceil(caseStudies.length / postsPerPage)
  createPaginatedPages(numCaseStudyPages, postsPerPage, 'case-studies', 'src/templates/case-studies.tsx', createPage)

  const numFeaturedPages = Math.ceil(featuredPosts.length / postsPerPage)
  createPaginatedPages(numFeaturedPages, postsPerPage, 'blog/featured', 'src/templates/blog-featured.tsx', createPage)

  const tags = await getTags(graphql)
  tags.forEach(({ tag, totalCount }) => {
    const numTagPages = Math.ceil(totalCount / postsPerPage)
    const additionalContext = { tag }

    createPaginatedPages(
      numTagPages,
      postsPerPage,
      `blog/tag/${tag}`,
      'src/templates/blog-tag.tsx',
      createPage,
      additionalContext
    )
  })
}

function createNodePath({ node, getNode }) {
  const directory = getNode(node.parent).relativeDirectory
  const filename = path.basename(node.fileAbsolutePath, path.extname(node.fileAbsolutePath))

  switch (directory) {
    case 'index':
      // For nodes inside the index directory, the path is the filename.
      return filename
    default:
      // For other nodes, the path is directory/filename.
      return createFilePath({ node, getNode })
  }
}

function preprocessMarkdown(obj) {
  if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach((key) => {
      if (key.startsWith('markdown__')) {
        obj[key] = remark().use(remarkHTML).processSync(obj[key]).toString()
      } else {
        // We need to preprocess subobjects as well.
        preprocessMarkdown(obj[key])
      }
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createNodePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  // Replace the value of all markdown fields by the parsed HTML.
  const frontmatter = node.frontmatter
  preprocessMarkdown(frontmatter)
}

function getWebpackPlugin(config, name) {
  return config.plugins.find((plugin) => plugin.constructor.name === name)
}

function configureMiniCssExtractPlugin(config) {
  const miniCssExtractPlugin = getWebpackPlugin(config, 'MiniCssExtractPlugin')

  if (miniCssExtractPlugin) {
    miniCssExtractPlugin.options.ignoreOrder = true
  }
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === 'build-javascript') {
    const config = getConfig()

    configureMiniCssExtractPlugin(config)

    actions.replaceWebpackConfig(config)
  }
}

exports.sourceNodes = async ({ actions, getNodes }) => {
  const { createNodeField } = actions

  const blogPosts = getNodes().filter(
    (node) => node.internal.type === 'MarkdownRemark' && /(blog)\/.*.md$/.test(node.fileAbsolutePath)
  )
  const authors = getNodes().filter(
    (node) => node.internal.type === 'MarkdownRemark' && /(author)\/.*.md$/.test(node.fileAbsolutePath)
  )

  blogPosts.forEach((node) => {
    if (node.frontmatter.authors) {
      const authorNodes = authors.filter((otherNode) => node.frontmatter.authors.includes(otherNode.frontmatter.title))

      if (authorNodes.length > 0) {
        createNodeField({
          node,
          name: 'authors',
          value: authorNodes,
        })
      }
    }
  })
}
