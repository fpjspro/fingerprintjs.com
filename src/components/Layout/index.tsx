import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../Footer'
import Header from '../Header'

// import '../../css/index.scss'
import useSiteMetadata from '../SiteMetadata'
import { withPrefix } from 'gatsby'

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()
  return (
    <div>
      <Helmet>
        <html lang='en' />
        <title>{title}</title>
        <meta name='description' content={description} />

        <link rel='apple-touch-icon' sizes='180x180' href={`${withPrefix('/')}img/apple-touch-icon.png`} />
        <link rel='icon' type='image/png' href={`${withPrefix('/')}img/favicon-32x32.png`} sizes='32x32' />
        <link rel='icon' type='image/png' href={`${withPrefix('/')}img/favicon-16x16.png`} sizes='16x16' />

        <link rel='mask-icon' href={`${withPrefix('/')}img/safari-pinned-tab.svg`} color='#ff4400' />
        <link
          href='https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
          rel='stylesheet'
        />
        <meta name='theme-color' content='#fff' />

        <meta property='og:type' content='business.business' />
        <meta property='og:title' content={title} />
        <meta property='og:url' content='/' />
        <meta property='og:image' content={`${withPrefix('/')}img/og-image.jpg`} />
      </Helmet>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default TemplateWrapper
