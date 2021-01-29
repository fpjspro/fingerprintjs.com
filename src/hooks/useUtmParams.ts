import { useMemo } from 'react'
import { useQueryParams } from './useQueryParams'

export const useUtmParams = (overrides?: Record<string, string>) => {
  const queryParams = useQueryParams()

  return useMemo(() => {
    const utmInfo = Object.keys(queryParams)
      .filter((key) => key.startsWith('utm_'))
      .reduce((acc: Record<string, string>, key) => {
        acc[key] = queryParams[key]
        return acc
      }, {})

    return { ...utmInfo, ...overrides }
  }, [queryParams, overrides])
}
