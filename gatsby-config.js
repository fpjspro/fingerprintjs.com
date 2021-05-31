const path = require('path')

const baseUrl = 'https://fingerprintjs.com'

const isProdContext = process.env.CONTEXT === 'production' // can't use env helper from TS sources here

const cspValueStaging = `default-src 'self'; script-src 'report-sample' 'self' 'sha256-xpUFDIKSffkTJajaomahRIRbTZ5aW5oJw10d1Q1T1WE=' 'sha256-G0jEfREnRnoHO7+3Y0228H/ntgRqVj76vXyfNtfUwoI=' 'sha256-egpbluqkD8NT0bY3bWy7raM9tRIMkfUWboq0Y8KqsFk=' 'sha256-fNL7JskeQYqtSCaMxLwNZeEdaadRJxEEAkbFZDyBY7U=' https://analytics.twitter.com https://api.olark.com https://assets.olark.com https://netlify-cdp-loader.netlify.app https://connect.facebook.net https://nrpc.olark.com https://snap.licdn.com https://static.ads-twitter.com https://www.googleadservices.com https://www.google.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.googletagmanager.com https://tagmanager.google.com; style-src 'report-sample' 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com https://static.olark.com; object-src 'none'; base-uri 'self'; connect-src 'self' https://coreapi.fpjs.sh https://api.github.com https://api.rollbar.com https://staging.cache.fpjs.sh https://f.fingerprintjs.com https://nrpc.olark.com https://www.google-analytics.com; font-src 'self' data: https://fonts.gstatic.com https://static.olark.com; frame-src 'self' https://app.netlify.com https://static.olark.com; img-src 'self' data: https://api.mapbox.com https://i.imgur.com https://log.olark.com https://px.ads.linkedin.com https://t.co https://www.facebook.com https://googleads.g.doubleclick.net  https://www.google.com https://www.google-analytics.com https://ssl.gstatic.com https://www.gstatic.com; manifest-src 'self'; media-src 'self' https://static.olark.com; report-uri https://api.fpjs.pro/_/csp-reports; worker-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests; form-action 'none';`
const cspValueProd = `default-src 'self'; script-src 'report-sample' 'self' 'sha256-xpUFDIKSffkTJajaomahRIRbTZ5aW5oJw10d1Q1T1WE=' 'sha256-G0jEfREnRnoHO7+3Y0228H/ntgRqVj76vXyfNtfUwoI=' 'sha256-egpbluqkD8NT0bY3bWy7raM9tRIMkfUWboq0Y8KqsFk=' 'sha256-fNL7JskeQYqtSCaMxLwNZeEdaadRJxEEAkbFZDyBY7U=' https://analytics.twitter.com https://api.olark.com https://assets.olark.com https://connect.facebook.net https://nrpc.olark.com https://snap.licdn.com https://static.ads-twitter.com https://www.googleadservices.com https://www.google.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.googletagmanager.com https://tagmanager.google.com; style-src 'report-sample' 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com https://static.olark.com; object-src 'none'; base-uri 'self'; connect-src 'self' https://api.fpjs.pro https://api.github.com https://api.rollbar.com https://api.sjpf.io https://f.fingerprintjs.com https://nrpc.olark.com https://www.google-analytics.com; font-src 'self' data: https://fonts.gstatic.com https://static.olark.com; frame-src 'self' https://static.olark.com; img-src 'self' data: https://api.mapbox.com https://i.imgur.com https://log.olark.com https://px.ads.linkedin.com https://t.co https://www.facebook.com https://googleads.g.doubleclick.net  https://www.google.com https://www.google-analytics.com https://ssl.gstatic.com https://www.gstatic.com; manifest-src 'self'; media-src 'self' https://static.olark.com; report-uri https://api.fpjs.pro/_/csp-reports; worker-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests; form-action 'none';`
const cspValue = isProdContext ? cspValueProd : cspValueStaging

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
            `Content-Security-Policy-Report-Only: ${cspValue}`,
            `Referrer-Policy: no-referrer-when-downgrade`,
          ],
        },
      },
    },
  ],
  mapping: {
    'MarkdownRemark.fields.author': 'MarkdownRemark[]',
  },
}
