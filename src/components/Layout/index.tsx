import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../Footer'
import Header from '../Header'

import useSiteMetadata from '../../hooks/useSiteMetadata'
import { FPJS_ENDPOINT, GTM_TOKEN } from '../../constants/env'
import { withTrailingSlash } from '../../helpers/url'
import { BASE_URL } from '../../constants/content'
import { defaultDataLayer } from '../../constants/content'
import { useVisitorData } from '../../context/FpjsContext'
import { enableAnalytics } from '../../helpers/gtm'

interface LayoutProps {
  children: React.ReactNode
}
export function Layout({ children }: LayoutProps) {
  const siteMetadata = useSiteMetadata()

  return <LayoutTemplate siteMetadata={siteMetadata}>{children}</LayoutTemplate>
}

interface LayoutTemplateProps extends LayoutProps {
  siteMetadata: GatsbyTypes.SiteSiteMetadata
}

// We need this to not use static GraphQL queries in order use it in CMS preview (it runs it in browser directly)
export function LayoutTemplate({ children, siteMetadata }: LayoutTemplateProps) {
  const { title, description, siteUrl, image } = siteMetadata
  const fpjsEndpoint = FPJS_ENDPOINT
  const gtmToken = GTM_TOKEN
  const { visitorData } = useVisitorData()
  const shouldEnableAnalytics = visitorData && visitorData.ipLocation.continent?.code?.toUpperCase() === 'EU'

  useEffect(() => {
    if (shouldEnableAnalytics) {
      enableAnalytics()
    }
  }, [shouldEnableAnalytics])

  return (
    <>
      <Helmet>
        <html lang='en' />
        <title>{title}</title>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' type='image/x-icon' href='/img/favicon.ico' />
        <meta name='description' content={description} />

        <meta property='og:url' content={withTrailingSlash(siteUrl ?? BASE_URL)} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content={withTrailingSlash(siteUrl ?? BASE_URL)} />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={description} />
        <meta property='twitter:image' content={image} />

        <meta name='facebook-domain-verification' content='dz50t3zs49efpmvtb6nzog8xj3fes0' />

        <script>{`dataLayer = ${JSON.stringify(defaultDataLayer)};`}</script>
        <script>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','${gtmToken}');`}
        </script>
        <link
          href='https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
          rel='stylesheet'
        />
        <link rel='preconnect' href={fpjsEndpoint} />
      </Helmet>
      <Header />
      {children}
      <Footer />
    </>
  )
}
