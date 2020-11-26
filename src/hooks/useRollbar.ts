import { ROLLBAR_ACCESS_TOKEN } from '../constants/env'
import Rollbar from 'rollbar'

let rollbar: Rollbar

export default function useRollbar(): Rollbar {
  if (rollbar) {
    return rollbar
  }

  rollbar = new Rollbar({
    accessToken: ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  })

  return rollbar
}
