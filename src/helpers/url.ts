export function withTrailingSlash(url: string) {
  return url.endsWith('/') ? url : `${url}/`
}

export function getRelativeUrl(url: string) {
  const relativeUrl = url.match(/fingerprintjs.com(\/.*)$/)
  return relativeUrl ? withTrailingSlash(relativeUrl[1]) : '/'
}
