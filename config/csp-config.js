const isProdContext = process.env.CONTEXT === 'production' // can't use env helper from TS sources here

const cspProdValues = {
  scriptSrc:
    "'self' 'sha256-kg92jgSA2EzM8AwnuekOuCBD3CO3Kbuysg5lIK9ZfSw=' 'sha256-zqIPI2g2ugmfel4J2XUMoQXIW4bR24iUgHjY714X0t8=' 'sha256-I8vNagfhtdBQM+h81pU4RVtKqzUmg18j7D+bD6umWoQ=' 'sha256-BlU3vSjtWCRb01JYtwFVwEn79C0VxILDgBS63iIXwM8=' 'sha256-6nixeeU2hi3MrSIjmGOq9yke14lrSwQbK5WkcJtIyU8=' 'sha256-xI1BcEci8jncUxYekf4P+TCNf5sIZW5qGF7D7oVMN1E=' 'sha256-Uz0yn00PqpvyPuK+MptaAirzRCPwuCU4Vhj/iAbfJxk=' 'sha256-cveTYmMF4Qjo/PsaU4HqenqlgU4hSXQEa8iFe7Hqzto='  https://analytics.twitter.com https://platform.twitter.com https://api.olark.com https://static.olark.com https://assets.olark.com https://connect.facebook.net https://nrpc.olark.com https://snap.licdn.com https://static.ads-twitter.com https://www.googleadservices.com https://www.google.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.googletagmanager.com https://tagmanager.google.com",
  connectSrc:
    "'self' https://api.fpjs.pro https://api.github.com https://api.rollbar.com https://api.sjpf.io https://f.fingerprintjs.com https://nrpc.olark.com https://www.google-analytics.com",
  frameSrc: "'self' https://static.olark.com;",
}
const cspStagingValues = {
  scriptSrc:
    "'self' 'sha256-xpUFDIKSffkTJajaomahRIRbTZ5aW5oJw10d1Q1T1WE=' 'sha256-gRdRAul2Q8J0Xw90SMORyALbYkU6lngGwcY6SI+MADU=' 'sha256-z2F9SsbN7syf0vOuFTXVMH4enBntY4ZiiRbqj7KLg94=' 'sha256-G0jEfREnRnoHO7+3Y0228H/ntgRqVj76vXyfNtfUwoI=' 'sha256-egpbluqkD8NT0bY3bWy7raM9tRIMkfUWboq0Y8KqsFk=' 'sha256-fNL7JskeQYqtSCaMxLwNZeEdaadRJxEEAkbFZDyBY7U=' https://analytics.twitter.com https://platform.twitter.com https://api.olark.com https://static.olark.com https://assets.olark.com https://netlify-cdp-loader.netlify.app https://connect.facebook.net https://nrpc.olark.com https://snap.licdn.com https://static.ads-twitter.com https://www.googleadservices.com https://www.google.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.googletagmanager.com https://tagmanager.google.com",
  connectSrc:
    "'self' https://coreapi.fpjs.sh https://api.github.com https://api.rollbar.com https://staging.cache.fpjs.sh https://f.fingerprintjs.com https://nrpc.olark.com https://www.google-analytics.com",
  frameSrc: "'self' https://app.netlify.com https://static.olark.com",
}
const cspValues = isProdContext ? cspProdValues : cspStagingValues

module.exports = {
  disableOnDev: true,
  mergeScriptHashes: true, // you can disable scripts sha256 hashes
  mergeStyleHashes: false, // disable styles sha256 hashes to allow unsafe-inline
  mergeDefaultDirectives: true,
  directives: {
    'script-src': cspValues.scriptSrc,
    'connect-src': cspValues.connectSrc,
    'frame-src': cspValues.frameSrc,
    'style-src':
      "'report-sample' 'self' 'unsafe-inline' https://fonts.googleapis.com https://tagmanager.google.com https://static.olark.com",
    'img-src':
      "'self' data: https://api.mapbox.com https://i.imgur.com https://log.olark.com https://px.ads.linkedin.com https://p.adsymptotic.com https://t.co https://www.facebook.com https://googleads.g.doubleclick.net  https://www.google.com https://www.google-analytics.com https://ssl.gstatic.com https://www.gstatic.com",
    'font-src': "'self' data: https://fonts.gstatic.com https://static.olark.com",
    'manifest-src': "'self'",
    'media-src': "'self' https://static.olark.com",
    'worker-src': "'none'",
    'upgrade-insecure-requests': '',
  },
}
