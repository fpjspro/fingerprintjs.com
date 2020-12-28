import React from 'react'
import { ReactComponent as GithubIconSvg } from './github_icon.svg'
import styles from './GithubButton.module.scss'
import classNames from 'classnames'
import { URL } from '../../constants/content'
import { numberFormatter } from '../../helpers/format'

import { useGithub } from '../../context/GithubContext'

interface GithubButtonProps {
  className?: string | string[]
}
export default function GithubButton({ className }: GithubButtonProps) {
  const { githubData } = useGithub()

  return (
    <a className={classNames(styles.button, className)} href={URL.githubRepoUrl}>
      <div className={styles.label}>
        <GithubIconSvg className={styles.icon} />
        <span>Star</span>
      </div>
      {githubData && <div className={styles.counter}>{numberFormatter.format(githubData.stargazers_count)}</div>}
    </a>
  )
}
