import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../Footer'
import Header from '../Header'

import useSiteMetadata from '../../hooks/useSiteMetadata'
import { GATSBY_FPJS_ENDPOINT, GATSBY_ROLLBAR_ACCESS_TOKEN } from '../../constants/env'

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
  const rollbarAccessToken = GATSBY_ROLLBAR_ACCESS_TOKEN

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
        <script>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-NCCSJM5');`}
        </script>
        <link
          href='https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
          rel='stylesheet'
        />
        <link rel='preconnect' href={fpjsEndpoint} />

        <script>
          {`var _rollbarConfig = {
  accessToken: '${rollbarAccessToken}',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production'
  }
};
!function (r) { function e(n) { if (o[n]) return o[n].exports; var t = o[n] = { exports: {}, id: n, loaded: !1 }; return r[n].call(t.exports, t, t.exports, e), t.loaded = !0, t.exports } var o = {}; return e.m = r, e.c = o, e.p = '', e(0) }([function (r, e, o) { 'use strict'; var n = o(1), t = o(4); _rollbarConfig = _rollbarConfig || {}, _rollbarConfig.rollbarJsUrl = _rollbarConfig.rollbarJsUrl || 'https://cdnjs.cloudflare.com/ajax/libs/rollbar.js/2.4.6/rollbar.min.js', _rollbarConfig.async = void 0 === _rollbarConfig.async || _rollbarConfig.async; var a = n.setupShim(window, _rollbarConfig), l = t(_rollbarConfig); window.rollbar = n.Rollbar, a.loadFull(window, document, !_rollbarConfig.async, _rollbarConfig, l) }, function (r, e, o) { 'use strict'; function n(r) { return function () { try { return r.apply(this, arguments) } catch (r) { try { console.error('[Rollbar]: Internal error', r) } catch (r) { } } } } function t(r, e) { this.options = r, this._rollbarOldOnError = null; var o = s++; this.shimId = function () { return o }, 'undefined' != typeof window && window._rollbarShims && (window._rollbarShims[o] = { handler: e, messages: [] }) } function a(r, e) { if (r) { var o = e.globalAlias || 'Rollbar'; if ('object' == typeof r[o]) return r[o]; r._rollbarShims = {}, r._rollbarWrappedError = null; var t = new p(e); return n(function () { e.captureUncaught && (t._rollbarOldOnError = r.onerror, i.captureUncaughtExceptions(r, t, !0), i.wrapGlobals(r, t, !0)), e.captureUnhandledRejections && i.captureUnhandledRejections(r, t, !0); var n = e.autoInstrument; return e.enabled !== !1 && (void 0 === n || n === !0 || 'object' == typeof n && n.network) && r.addEventListener && (r.addEventListener('load', t.captureLoad.bind(t)), r.addEventListener('DOMContentLoaded', t.captureDomContentLoaded.bind(t))), r[o] = t, t })() } } function l(r) { return n(function () { var e = this, o = Array.prototype.slice.call(arguments, 0), n = { shim: e, method: r, args: o, ts: new Date }; window._rollbarShims[this.shimId()].messages.push(n) }) } var i = o(2), s = 0, d = o(3), c = function (r, e) { return new t(r, e) }, p = d.bind(null, c); t.prototype.loadFull = function (r, e, o, t, a) { var l = function () { var e; if (void 0 === r._rollbarDidLoad) { e = new Error('rollbar.js did not load'); for (var o, n, t, l, i = 0; o = r._rollbarShims[i++];)for (o = o.messages || []; n = o.shift();)for (t = n.args || [], i = 0; i < t.length; ++i)if (l = t[i], 'function' == typeof l) { l(e); break } } 'function' == typeof a && a(e) }, i = !1, s = e.createElement('script'), d = e.getElementsByTagName('script')[0], c = d.parentNode; s.crossOrigin = '', s.src = t.rollbarJsUrl, o || (s.async = !0), s.onload = s.onreadystatechange = n(function () { if (!(i || this.readyState && 'loaded' !== this.readyState && 'complete' !== this.readyState)) { s.onload = s.onreadystatechange = null; try { c.removeChild(s) } catch (r) { } i = !0, l() } }), c.insertBefore(s, d) }, t.prototype.wrap = function (r, e, o) { try { var n; if (n = 'function' == typeof e ? e : function () { return e || {} }, 'function' != typeof r) return r; if (r._isWrap) return r; if (!r._rollbar_wrapped && (r._rollbar_wrapped = function () { o && 'function' == typeof o && o.apply(this, arguments); try { return r.apply(this, arguments) } catch (o) { var e = o; throw e && ('string' == typeof e && (e = new String(e)), e._rollbarContext = n() || {}, e._rollbarContext._wrappedSource = r.toString(), window._rollbarWrappedError = e), e } }, r._rollbar_wrapped._isWrap = !0, r.hasOwnProperty)) for (var t in r) r.hasOwnProperty(t) && (r._rollbar_wrapped[t] = r[t]); return r._rollbar_wrapped } catch (e) { return r } }; for (var u = 'log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleUnhandledRejection,captureEvent,captureDomContentLoaded,captureLoad'.split(','), f = 0; f < u.length; ++f)t.prototype[u[f]] = l(u[f]); r.exports = { setupShim: a, Rollbar: p } }, function (r, e) { 'use strict'; function o(r, e, o) { if (r) { var t; 'function' == typeof e._rollbarOldOnError ? t = e._rollbarOldOnError : r.onerror && !r.onerror.belongsToShim && (t = r.onerror, e._rollbarOldOnError = t); var a = function () { var o = Array.prototype.slice.call(arguments, 0); n(r, e, t, o) }; a.belongsToShim = o, r.onerror = a } } function n(r, e, o, n) { r._rollbarWrappedError && (n[4] || (n[4] = r._rollbarWrappedError), n[5] || (n[5] = r._rollbarWrappedError._rollbarContext), r._rollbarWrappedError = null), e.handleUncaughtException.apply(e, n), o && o.apply(r, n) } function t(r, e, o) { if (r) { 'function' == typeof r._rollbarURH && r._rollbarURH.belongsToShim && r.removeEventListener('unhandledrejection', r._rollbarURH); var n = function (r) { var o, n, t; try { o = r.reason } catch (r) { o = void 0 } try { n = r.promise } catch (r) { n = '[unhandledrejection] error getting \`promise\` from event' } try { t = r.detail, !o && t && (o = t.reason, n = t.promise) } catch (r) { t = '[unhandledrejection] error getting \`detail\` from event' } o || (o = '[unhandledrejection] error getting \`reason\` from event'), e && e.handleUnhandledRejection && e.handleUnhandledRejection(o, n) }; n.belongsToShim = o, r._rollbarURH = n, r.addEventListener('unhandledrejection', n) } } function a(r, e, o) { if (r) { var n, t, a = 'EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload'.split(','); for (n = 0; n < a.length; ++n)t = a[n], r[t] && r[t].prototype && l(e, r[t].prototype, o) } } function l(r, e, o) { if (e.hasOwnProperty && e.hasOwnProperty('addEventListener')) { for (var n = e.addEventListener; n._rollbarOldAdd && n.belongsToShim;)n = n._rollbarOldAdd; var t = function (e, o, t) { n.call(this, e, r.wrap(o), t) }; t._rollbarOldAdd = n, t.belongsToShim = o, e.addEventListener = t; for (var a = e.removeEventListener; a._rollbarOldRemove && a.belongsToShim;)a = a._rollbarOldRemove; var l = function (r, e, o) { a.call(this, r, e && e._rollbar_wrapped || e, o) }; l._rollbarOldRemove = a, l.belongsToShim = o, e.removeEventListener = l } } r.exports = { captureUncaughtExceptions: o, captureUnhandledRejections: t, wrapGlobals: a } }, function (r, e) { 'use strict'; function o(r, e) { this.impl = r(e, this), this.options = e, n(o.prototype) } function n(r) { for (var e = function (r) { return function () { var e = Array.prototype.slice.call(arguments, 0); if (this.impl[r]) return this.impl[r].apply(this.impl, e) } }, o = 'log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleUnhandledRejection,_createItem,wrap,loadFull,shimId,captureEvent,captureDomContentLoaded,captureLoad'.split(','), n = 0; n < o.length; n++)r[o[n]] = e(o[n]) } o.prototype._swapAndProcessMessages = function (r, e) { this.impl = r(this.options); for (var o, n, t; o = e.shift();)n = o.method, t = o.args, this[n] && 'function' == typeof this[n] && ('captureDomContentLoaded' === n || 'captureLoad' === n ? this[n].apply(this, [t[0], o.ts]) : this[n].apply(this, t)); return this }, r.exports = o }, function (r, e) { 'use strict'; r.exports = function (r) { return function (e) { if (!e && !window._rollbarInitialized) { r = r || {}; for (var o, n, t = r.globalAlias || 'Rollbar', a = window.rollbar, l = function (r) { return new a(r) }, i = 0; o = window._rollbarShims[i++];)n || (n = o.handler), o.handler._swapAndProcessMessages(l, o.messages); window[t] = n, window._rollbarInitialized = !0 } } } }]);`}
        </script>
        <script>
          {`(function(c,a){if(!a.__SV){var b=window;try{var d,m,j,k=b.location,f=k.hash;d=function(a,b){return(m=a.match(RegExp(b+'=([^&]*)')))?m[1]:null};f&&d(f,'state')&&(j=JSON.parse(decodeURIComponent(d(f,'state'))),'mpeditor'===j.action&&(b.sessionStorage.setItem('_mpcehash',f),history.replaceState(j.desiredHash||'',c.title,k.pathname+k.search)))}catch(n){}var l,h;window.mixpanel=a;a._i=[];a.init=function(b,d,g){function c(b,i){var a=i.split('.');2==a.length&&(b=b[a[0]],i=a[1]);b[i]=function(){b.push([i].concat(Array.prototype.slice.call(arguments,
  0)))}}var e=a;'undefined'!==typeof g?e=a[g]=[]:g='mixpanel';e.people=e.people||[];e.toString=function(b){var a='mixpanel';'mixpanel'!==g&&(a+='.'+g);b||(a+=' (stub)');return a};e.people.toString=function(){return e.toString(1)+'.people (stub)'};l='disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove'.split(' ');
  for(h=0;h<l.length;h++)c(e,l[h]);var f='set set_once union unset remove delete'.split(' ');e.get_group=function(){function a(c){b[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));e.push([d,call2])}}for(var b={},d=['get_group'].concat(Array.prototype.slice.call(arguments,0)),c=0;c<f.length;c++)a(f[c]);return b};a._i.push([b,d,g])};a.__SV=1.2;b=c.createElement('script');b.type='text/javascript';b.async=!0;b.src='undefined'!==typeof MIXPANEL_CUSTOM_LIB_URL?
  MIXPANEL_CUSTOM_LIB_URL:'file:'===c.location.protocol&&'//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js'.match(/^\\/\\//)?'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js':'//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js';d=c.getElementsByTagName('script')[0];d.parentNode.insertBefore(b,d)}})(document,window.mixpanel||[]);
  mixpanel.init('1d10e0bdf9a00c159ed6facf2fafef82', {batch_requests: true});mixpanel.track('Homepage');`}
        </script>
        <link
          href='https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
          rel='stylesheet'
        />
      </Helmet>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  )
}
