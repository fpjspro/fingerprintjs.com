import React from 'react'
import { useLocation } from '@reach/router'
import useSiteMetadata from '../../hooks/useSiteMetadata'
import styles from './ActionBar.module.scss'
import { displayDateFormatter } from '../../helpers/format'
import { copyToClipboard } from '../../helpers/clipboard'

import { camelize } from '../../helpers/case'
import { ReactComponent as LinkedinSvg } from './linkedin.svg'
import { ReactComponent as FacebookSvg } from './facebook.svg'
import { ReactComponent as TwitterSvg } from './twitter.svg'
import { ReactComponent as ShareSvg } from './shareButton.svg'

export interface ActionBarProps {
  publishDate: string
  title: string
  description: string
  tags: string[]
}
export default function ActionBar({ publishDate, description, tags, title }: ActionBarProps) {
  const { pathname } = useLocation()
  const siteMetadata = useSiteMetadata()
  const path = `${siteMetadata.siteUrl}${pathname}`
  const camelizedTags = tags.map((tag) => camelize(tag))

  const date = displayDateFormatter.format(new Date(publishDate))
  return (
    <div className={styles.root}>
      <span className={styles.publishDate}>{date}</span>
      <div>
        <ActionButton socialMedia='linkedin' link={path} description={description} title={title} />
        <ActionButton socialMedia='twitter' link={path} description={description} tags={camelizedTags} />
        <ActionButton socialMedia='facebook' link={path} />
        <ActionButton socialMedia='shareLink' link={path} />
      </div>
    </div>
  )
}

interface ActionButtonProps {
  socialMedia: 'linkedin' | 'twitter' | 'facebook' | 'shareLink'
  link: string
  description?: string
  title?: string
  tags?: string[]
}
function ActionButton({ socialMedia, link, description, title, tags }: ActionButtonProps) {
  switch (socialMedia) {
    case 'linkedin':
      return (
        <a
          className={styles.link}
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${link}&summary=${description}&title=${title}&source=FingerprintJS`}
          target='_blank'
          rel='noreferrer'
          aria-label='Share on Linkedin'
        >
          <LinkedinSvg />
        </a>
      )
    case 'twitter':
      return (
        <a
          className={styles.link}
          href={`https://twitter.com/intent/tweet?url=${link}&text=${description}&hashtags=${tags}&via=FingerprintJS`}
          target='_blank'
          rel='noreferrer'
          aria-label='Share on Twitter'
        >
          <TwitterSvg />
        </a>
      )
    case 'facebook':
      return (
        <a
          className={styles.link}
          href={`https://www.facebook.com/sharer.php?u=${link}`}
          target='_blank'
          rel='noreferrer'
          aria-label='Share on Facebook'
        >
          <FacebookSvg />
        </a>
      )
    case 'shareLink':
      return (
        <button
          className={styles.link}
          onClick={() => {
            copyToClipboard(link)
          }}
        >
          <ShareSvg />
        </button>
      )
  }
}
