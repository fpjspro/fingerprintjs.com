import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import {ReactComponent as GithubIconSvg} from './github_icon.svg';

interface GithubReposResponse {
  stargazers_count: number;
}

export default function GithubButton() {
  const githubToken = process.env.GATSBY_GITHUB_API_TOKEN;
  const url = 'https://api.github.com/repos/fingerprintjs/fingerprintjs';
  const options = {
    headers: {
      Authorization: `token ${githubToken}`,
    },
  };

  const {data} = useFetch<GithubReposResponse>(url, options);

  return (
    <a className="btn btn--github" href="https://github.com/fingerprintjs/fingerprintjs">
      <div className="btn__label">
        <GithubIconSvg className='icon'/>
        <span>
          Star
        </span>
      </div>
      <div className="github-counter">{data?.stargazers_count}</div>
    </a>
  )
}
