import { useLocation } from '@reach/router'
import { useMemo } from 'react'
import { objectFromEntries } from '../helpers/common'

export const useQueryParams = () => {
  const searchStr = useLocation().search

  return useMemo(() => {
    const urlParamsEntries = new URLSearchParams(searchStr).entries()

    return objectFromEntries(urlParamsEntries)
  }, [searchStr])
}
