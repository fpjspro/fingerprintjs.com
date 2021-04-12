import { defaultDataLayer } from '../constants/content'

// GTM API requires dataLayer access through global window variable
declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Window {
    // eslint-disable-next-line @typescript-eslint/ban-types
    dataLayer: object[]
  }
}

export enum EventAction {
  EmailType = 'EmailType',
  ClickButton = 'ClickButton',
  IntentComplete = 'IntentComplete',
}

export enum EventCategory {
  Signup = 'Signup',
}

export enum EventLabel {
  ClickTextbox = 'ClickTextbox',
  TrialNav = 'TrialNav',
  FormFill = 'FormFill',
}

// We not decided yet about event payload format
export enum EventType {
  LegacyEvent = 'legacy.event',
}

type SendEventProps = {
  action: EventAction
  category: EventCategory
  label?: EventLabel
}

export function sendEvent({ event }: { event: string }) {
  // Required for development since without SSR sendEvent will be called before Helmet has a chance to inject the script that initializes dataLayer.
  window.dataLayer = window.dataLayer ?? defaultDataLayer

  window.dataLayer.push({ event })
}

export function sendLegacyEvent(props: SendEventProps) {
  // Required for development since without SSR sendEvent will be called before Helmet has a chance to inject the script that initializes dataLayer.
  window.dataLayer = window.dataLayer ?? defaultDataLayer

  window.dataLayer.push({ event: EventType.LegacyEvent, eventProps: { ...props } })
}

export function trackEmbeddedFormClick() {
  sendLegacyEvent({ action: EventAction.EmailType, category: EventCategory.Signup, label: EventLabel.ClickTextbox })
}

export function trackNavSignupClick() {
  sendLegacyEvent({ action: EventAction.ClickButton, category: EventCategory.Signup, label: EventLabel.TrialNav })
}

export function trackSignupSubmit() {
  sendLegacyEvent({ action: EventAction.IntentComplete, category: EventCategory.Signup, label: EventLabel.FormFill })
}

export function trackEmbeddedFormSubmit() {
  sendLegacyEvent({ action: EventAction.IntentComplete, category: EventCategory.Signup, label: EventLabel.FormFill })
}
