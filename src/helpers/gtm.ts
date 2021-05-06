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
  IntentSuccess = 'IntentSuccess',
  LeadSubmit = 'lead-submit',
}

export enum EventCategory {
  Signup = 'Signup',
  Lead = 'lead',
}

export enum EventLabel {
  FormFill = 'FormFill',
  Error = 'error',
  Success = 'success',
}

// We not decided yet about event payload format
export enum EventType {
  LegacyEvent = 'legacy.event',
  EnableAnalytics = 'event.enableAnalytics',
}

type SendEventProps = {
  action: EventAction
  category: EventCategory
  label?: EventLabel
}

function setupDataLayer() {
  // Required for development since without SSR sendEvent will be called before Helmet has a chance to inject the script that initializes dataLayer.
  window.dataLayer = window.dataLayer ?? defaultDataLayer
}

export function sendEvent(props: SendEventProps) {
  setupDataLayer()

  window.dataLayer.push({ event: EventType.LegacyEvent, eventProps: { ...props } })
}

export function enableAnalytics() {
  setupDataLayer()

  window.dataLayer.push({ event: EventType.EnableAnalytics })
}

export function trackEmbeddedFormSubmit() {
  sendEvent({ action: EventAction.IntentSuccess, category: EventCategory.Signup, label: EventLabel.FormFill })
}

export function trackLeadSubmit(success = true) {
  sendEvent({
    action: EventAction.LeadSubmit,
    category: EventCategory.Lead,
    label: success ? EventLabel.Success : EventLabel.Error,
  })
}
