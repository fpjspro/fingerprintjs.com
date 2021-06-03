const path = require('path')

const baseUrl = 'https://fingerprintjs.com'
const cspConfig = require('./config/csp-config')

const resolvePath = (directoryName, pathName) => {
  const result = path.join(directoryName, pathName)
  if (process.platform === 'win32') {
    return result.replace(/\\/g, '\\\\')
  }

  return result
}

module.exports = {
  siteMetadata: {
    title: 'FingerprintJS Pro - Browser fingerprinting and fraud detection API',
    description: 'Stop fraud, spam, and account takeovers with 99.5% accurate browser fingerprinting as a service.',
    siteUrl: baseUrl,
    image: 'https://fingerprintjs.com/img/fpjs-preview.png',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ['BRANCH', 'CONTEXT'],
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
        useAutoGen: true,
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: require('sass'),
        data: `@import "${resolvePath(__dirname, '/src/styles/common')}";`,
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/`,
        name: 'index',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              terminal: 'carbon',
              lineNumbers: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        ref: true,
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.ts$|\.tsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-typegen',
      options: {
        outputPath: 'src/__generated__/gatsby-types.d.ts',
      },
    },
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-netlify', // make sure to keep it last in the array
      options: {
        mergeSecurityHeaders: false,
        headers: {
          '/*': [
            `X-Frame-Options: DENY`,
            `X-XSS-Protection: 1; mode=block`,
            `X-Content-Type-Options: nosniff`,
            `Referrer-Policy: no-referrer-when-downgrade`,
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-csp`,
      options: cspConfig,
    },
  ],
  mapping: {
    'MarkdownRemark.fields.author': 'MarkdownRemark[]',
  },
}
