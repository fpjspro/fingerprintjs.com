// GTM API requires dataLayer access through global window variable
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/ban-types
    dataLayer: object[]
  }
}

export function sendEvent({ event }: { event: string }) {
  window.dataLayer.push({ event })
}
