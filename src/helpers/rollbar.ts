import { useState } from 'react'
import { GATSBY_ROLLBAR_ACCESS_TOKEN } from './../constants/env'
import Rollbar from 'rollbar'

export default function useRollbar(): Rollbar {
  const [rollbar] = useState(
    new Rollbar({
      accessToken: GATSBY_ROLLBAR_ACCESS_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        environment: 'production',
      },
    })
  )

  return rollbar
}
