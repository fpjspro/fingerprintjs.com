import { useLocation } from '@reach/router'
import { useEffect, useState } from 'react'
import { objectFromEntries } from '../helpers/common'

export const useQueryParams = () => {
  const searchStr = useLocation().search
  const [queryParams, setQueryParams] = useState<Record<string, string>>({})

  useEffect(() => {
    const urlParamsEntries = new URLSearchParams(searchStr).entries()

    setQueryParams(objectFromEntries(urlParamsEntries))
  }, [searchStr])

  return queryParams
}
