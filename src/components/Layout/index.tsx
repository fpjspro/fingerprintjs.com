import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../Footer'
import Header from '../Header'

import useSiteMetadata from '../../hooks/useSiteMetadata'
import { GATSBY_FPJS_ENDPOINT, GATSBY_GTM_TOKEN, GATSBY_OPTIMIZE_TOKEN } from '../../constants/env'

interface LayoutProps {
  children: React.ReactNode
}
export default function Layout({ children }: LayoutProps) {
  const siteMetadata = useSiteMetadata()

  return <LayoutTemplate siteMetadata={siteMetadata}>{children}</LayoutTemplate>
}

interface LayoutTemplateProps extends LayoutProps {
  siteMetadata: GatsbyTypes.SiteSiteMetadata
}

// We need this to not use static GraphQL queries in order use it in CMS preview (it runs it in browser directly)
export function LayoutTemplate({ children, siteMetadata }: LayoutTemplateProps) {
  const { title, description, url, image } = siteMetadata
  const fpjsEndpoint = GATSBY_FPJS_ENDPOINT
  const gtmToken = GATSBY_GTM_TOKEN
  const optimizeToken = GATSBY_OPTIMIZE_TOKEN

  return (
    <>
      <Helmet>
        <html lang='en' />
        <title>{title}</title>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' type='image/x-icon' href='/img/favicon.ico' />
        <meta name='description' content={description} />

        <meta property='og:url' content={url} />
        <meta property='og:title' content={title} />
        <meta
          property='og:description'
          content='Stop fraud, spam, and account takeovers with 99.5% accurate browser fingerprinting as a service.'
        />
        <meta property='og:image' content={image} />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content={url} />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={description} />
        <meta property='twitter:image' content={image} />
        <script src={`https://www.googleoptimize.com/optimize.js?id=${optimizeToken}`} />
        <script>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','${gtmToken}');`}
        </script>
        <link
          href='https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
          rel='stylesheet'
        />
        <link rel='preconnect' href={fpjsEndpoint} />
        <script>
          {`(function(c,a){if(!a.__SV){var b=window;try{var d,m,j,k=b.location,f=k.hash;d=function(a,b){return(m=a.match(RegExp(b+'=([^&]*)')))?m[1]:null};f&&d(f,'state')&&(j=JSON.parse(decodeURIComponent(d(f,'state'))),'mpeditor'===j.action&&(b.sessionStorage.setItem('_mpcehash',f),history.replaceState(j.desiredHash||'',c.title,k.pathname+k.search)))}catch(n){}var l,h;window.mixpanel=a;a._i=[];a.init=function(b,d,g){function c(b,i){var a=i.split('.');2==a.length&&(b=b[a[0]],i=a[1]);b[i]=function(){b.push([i].concat(Array.prototype.slice.call(arguments,
  0)))}}var e=a;'undefined'!==typeof g?e=a[g]=[]:g='mixpanel';e.people=e.people||[];e.toString=function(b){var a='mixpanel';'mixpanel'!==g&&(a+='.'+g);b||(a+=' (stub)');return a};e.people.toString=function(){return e.toString(1)+'.people (stub)'};l='disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove'.split(' ');
  for(h=0;h<l.length;h++)c(e,l[h]);var f='set set_once union unset remove delete'.split(' ');e.get_group=function(){function a(c){b[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));e.push([d,call2])}}for(var b={},d=['get_group'].concat(Array.prototype.slice.call(arguments,0)),c=0;c<f.length;c++)a(f[c]);return b};a._i.push([b,d,g])};a.__SV=1.2;b=c.createElement('script');b.type='text/javascript';b.async=!0;b.src='undefined'!==typeof MIXPANEL_CUSTOM_LIB_URL?
  MIXPANEL_CUSTOM_LIB_URL:'file:'===c.location.protocol&&'//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js'.match(/^\\/\\//)?'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js':'//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js';d=c.getElementsByTagName('script')[0];d.parentNode.insertBefore(b,d)}})(document,window.mixpanel||[]);
  mixpanel.init('1d10e0bdf9a00c159ed6facf2fafef82', {batch_requests: true});mixpanel.track('Homepage');`}
        </script>
      </Helmet>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  )
}
