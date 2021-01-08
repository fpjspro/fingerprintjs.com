import { defaultDataLayer } from '../constants/content'

// GTM API requires dataLayer access through global window variable
declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Window {
    // eslint-disable-next-line @typescript-eslint/ban-types
    dataLayer: object[]
  }
}

export function sendEvent({ event }: { event: string }) {
  window.dataLayer = window.dataLayer ?? defaultDataLayer

  window.dataLayer.push({ event })
}
