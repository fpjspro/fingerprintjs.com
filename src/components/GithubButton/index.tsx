import React, { useMemo } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { ReactComponent as GithubIconSvg } from './github_icon.svg'
import styles from './GithubButton.module.scss'
import classNames from 'classnames'
import { GITHUB_API_TOKEN } from '../../constants/env'
import { URL } from '../../constants/content'
import { numberFormatter } from '../../helpers/format'

interface GithubReposResponse {
  stargazers_count: number
}

interface GithubButtonProps {
  className?: string | string[]
}

const githubToken = GITHUB_API_TOKEN

export default function GithubButton({ className }: GithubButtonProps) {
  const options = useMemo(() => {
    return {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    }
  }, [])

  const { data } = useFetch<GithubReposResponse>(URL.githubApiUrl, options)

  return (
    <a className={classNames(styles.button, className)} href={URL.githubRepoUrl}>
      <div className={styles.label}>
        <GithubIconSvg className={styles.icon} />
        <span>Star</span>
      </div>
      <div className={styles.counter}>{data && numberFormatter.format(data.stargazers_count)}</div>
    </a>
  )
}
