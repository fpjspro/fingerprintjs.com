import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { GITHUB_API_TOKEN } from '../constants/env'
import { URL } from '../constants/content'

export interface GithubReposResponse {
  stargazers_count: number
}

const GithubContext = createContext<{ githubData?: GithubReposResponse }>({})
export const useGithub = () => useContext(GithubContext)

export function GithubProvider({ children }: { children: React.ReactNode }) {
  const [githubData, setGithubData] = useState<GithubReposResponse>()

  const options = useMemo(() => {
    return {
      headers: {
        Authorization: `token ${GITHUB_API_TOKEN}`,
      },
    }
  }, [])

  useEffect(() => {
    async function getGithubData() {
      const response = await fetch(URL.githubApiUrl, options)
      const status = response.status
      const data = await response.json()

      if (status === 200) {
        setGithubData(data)
      }
    }

    getGithubData()
  }, [options])

  return <GithubContext.Provider value={{ githubData }}>{children}</GithubContext.Provider>
}

export default GithubContext
