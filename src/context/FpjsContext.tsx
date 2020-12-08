import React, { useEffect, useState, useContext } from 'react'
import { FullIpExtendedGetResult, GetOptions, Region } from '@fingerprintjs/fingerprintjs-pro'
import { FPJS_TOKEN, FPJS_ENDPOINT, FPJS_REGION } from '../constants/env'

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
  const [visitorData, setVisitorData] = useState<FullIpExtendedGetResult>()

  useEffect(() => {
    async function getVisitorData() {
      const FP = await import('@fingerprintjs/fingerprintjs-pro')
      const fp = await FP.load({ token: clientToken, endpoint, region })
      const result = await fp.get(config)

      setVisitorData(result)
    }

    getVisitorData()
  }, [clientToken, endpoint, region])

  return <FpjsContext.Provider value={{ visitorData }}>{children}</FpjsContext.Provider>
}

export default FpjsContext
