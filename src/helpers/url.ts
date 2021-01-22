import { objectFromEntries } from './common'
import { isBrowser } from './detector'

export function withTrailingSlash(url: string) {
  return url.endsWith('/') ? url : `${url}/`
}

export function getRelativeUrl(url: string) {
  const relativeUrl = url.match(/fingerprintjs.com(\/.*)$/)
  return relativeUrl ? withTrailingSlash(relativeUrl[1]) : '/'
}

export function getUtmParams(search: string, overrides?: Record<string, string>) {
  const urlParamsEntries = new URLSearchParams(search).entries()
  const urlParams = objectFromEntries(urlParamsEntries)

  const utmInfo = Object.keys(urlParams)
    .filter((key) => key.startsWith('utm_'))
    .reduce((acc: Record<string, string>, key) => {
      acc[key] = urlParams[key]
      return acc
    }, {})

  return { ...utmInfo, ...overrides }
}

export function browserRedirect(href: string) {
  if (isBrowser()) {
    window.location.href = href
  }
}
