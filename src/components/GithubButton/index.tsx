import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import { ReactComponent as GithubIconSvg } from './github_icon.svg'
import styles from './GithubButton.module.scss'

interface GithubReposResponse {
  stargazers_count: number
}

export default function GithubButton() {
  const githubToken = process.env.GATSBY_GITHUB_API_TOKEN
  const url = 'https://api.github.com/repos/fingerprintjs/fingerprintjs'
  const options = {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  }

  const { data } = useFetch<GithubReposResponse>(url, options)

  return (
    <a className={styles.button} href='https://github.com/fingerprintjs/fingerprintjs'>
      <div className={styles.label}>
        <GithubIconSvg className={styles.icon} />
        <span>Star</span>
      </div>
      <div className={styles.counter}>{data?.stargazers_count}</div>
    </a>
  )
}
