import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import {ReactComponent as GithubIconSvg} from './github_icon.svg';
import styles from './GithubButton.module.scss';
import classNames from 'classnames';

interface GithubReposResponse {
  stargazers_count: number;
}

interface GithubButtonProps {
  className?: string | string[];
}

export default function GithubButton({className}: GithubButtonProps) {
  const githubToken = process.env.GATSBY_GITHUB_API_TOKEN;
  const url = 'https://api.github.com/repos/fingerprintjs/fingerprintjs';
  const options = {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  };

  const {data} = useFetch<GithubReposResponse>(url, options);

  return (
    <a className={classNames(styles.button, className)} href="https://github.com/fingerprintjs/fingerprintjs">
      <div className={styles.label}>
        <GithubIconSvg className={styles.icon}/>
        <span>
          Star
        </span>
      </div>
      <div className={styles.counter}>{data?.stargazers_count}</div>
    </a>
  )
}
