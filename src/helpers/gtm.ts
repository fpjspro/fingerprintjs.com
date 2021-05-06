import { defaultDataLayer } from '../constants/content'
import { useVisitorData } from '../context/FpjsContext'

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

function sendEvent(enableTracking: boolean, props: SendEventProps) {
  setupDataLayer()

  window.dataLayer.push({ event: EventType.LegacyEvent, enableTracking, eventProps: { ...props } })
}

const trackEmbeddedFormSubmit = (enableTracking: boolean) => () => {
  sendEvent(enableTracking, {
    action: EventAction.IntentSuccess,
    category: EventCategory.Signup,
    label: EventLabel.FormFill,
  })
}

const trackLeadSubmit = (enableTracking: boolean) => (success = true) => {
  sendEvent(enableTracking, {
    action: EventAction.LeadSubmit,
    category: EventCategory.Lead,
    label: success ? EventLabel.Success : EventLabel.Error,
  })
}

export function useGtm() {
  const { visitorData } = useVisitorData()
  const enableTracking = !visitorData || visitorData.ipLocation.continent?.code === 'EU'

  return {
    trackEmbeddedFormSubmit: trackEmbeddedFormSubmit(enableTracking),
    trackLeadSubmit: trackLeadSubmit(enableTracking),
  }
}
