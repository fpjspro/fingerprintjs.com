import React, { useEffect, useState, useContext } from 'react'
import { FullIpExtendedGetResult, GetOptions, Region } from '@fingerprintjs/fingerprintjs-pro'
import {
  FPJS_TOKEN,
  FPJS_ENDPOINT,
  FPJS_REGION,
  FPJS_MONITORING_CLIENT_ID,
  FPJS_MONITORING_TOKEN,
  TLS_ENDPOINT,
} from '../constants/env'

const FpjsContext = React.createContext<{ visitorData?: FullIpExtendedGetResult }>({})
const config: GetOptions<true, 'full'> = {
  ipResolution: 'full',
  extendedResult: true,
  timeout: 30_000,
}

export const useVisitorData = () => useContext(FpjsContext)

export function FpjsProvider({ children }: { children: React.ReactNode }) {
  const clientToken = FPJS_TOKEN
  const endpoint = FPJS_ENDPOINT
  const region = FPJS_REGION as Region
  const monitoringClientId = FPJS_MONITORING_CLIENT_ID ?? ''
  const monitoringToken = FPJS_MONITORING_TOKEN ?? ''
  const tlsEndpoint = TLS_ENDPOINT

  const [visitorData, setVisitorData] = useState<FullIpExtendedGetResult>()

  useEffect(() => {
    async function getVisitorData() {
      try {
        const FP = await import('@fingerprintjs/fingerprintjs-pro')
        const fp = await FP.load({
          token: clientToken,
          endpoint,
          region,
          tlsEndpoint,

          // It may break after a @fingerprintjs/fingerprintjs-pro update. Please check when updating.
          debug: monitoringToken
            ? FP.makeRemoteDebugger({ clientId: monitoringClientId, token: monitoringToken })
            : undefined,
        })
        const result = await fp.get(config)
        setVisitorData(result)
      } catch (error) {
        // Adds a special name to JS agent errors so that they can be found in Rollbar easily.
        error.message = `${error.name}: ${error.message}`
        error.name = 'FPJSAgentError'
        throw error
      }
    }

    getVisitorData()
  }, [clientToken, endpoint, tlsEndpoint, region, monitoringClientId, monitoringToken])

  return <FpjsContext.Provider value={{ visitorData }}>{children}</FpjsContext.Provider>
}

export default FpjsContext
