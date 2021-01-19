import { useMemo } from 'react'
import { useQueryParams } from './useQueryParams'

export const useUtmParams = () => {
  const queryParams = useQueryParams()

  return useMemo(() => {
    return Object.keys(queryParams)
      .filter((key) => key.startsWith('utm_') || key === 'referral_url')
      .reduce((acc: Record<string, string>, key) => {
        acc[key] = queryParams[key]
        return acc
      }, {})
  }, [queryParams])
}
