import React from 'react'

import styles from './ActionBar.module.scss'
import classNames from 'classnames'

import { displayDateFormatter } from '../../helpers/format'
import { copyToClipboard } from '../../helpers/clipboard'

import { camelize } from '../../helpers/case'
import { ReactComponent as LinkedinSvg } from './linkedin.svg'
import { ReactComponent as FacebookSvg } from './facebook.svg'
import { ReactComponent as TwitterSvg } from './twitter.svg'
import { ReactComponent as ShareSvg } from './shareButton.svg'

export interface ActionBarProps {
  siteUrl: string
  publishDate: string
  description: string
  tags: string[]
}
export default function ActionBar({ siteUrl, publishDate, description, tags = [] }: ActionBarProps) {
  const camelizedTags = tags.map((tag) => camelize(tag))

  const date = displayDateFormatter.format(new Date(publishDate))
  return (
    <div className={styles.root}>
      <span className={styles.publishDate}>{date}</span>
      <div>
        <ActionButton socialMedia='linkedin' link={siteUrl} />
        <ActionButton socialMedia='twitter' link={siteUrl} description={description} tags={camelizedTags} />
        <ActionButton socialMedia='facebook' link={siteUrl} />
        <ActionButton socialMedia='shareLink' link={siteUrl} />
      </div>
    </div>
  )
}

interface ActionButtonProps {
  socialMedia: 'linkedin' | 'twitter' | 'facebook' | 'shareLink'
  link: string
  description?: string
  tags?: string[]
}
function ActionButton({ socialMedia, link, description, tags }: ActionButtonProps) {
  const windowsOpen = (path: string) => {
    return window.open(path, '', '_blank, width=560, height=745, resizable=yes, scrollbars=yes')
  }

  switch (socialMedia) {
    case 'linkedin':
      return (
        <a
          className={styles.link}
          aria-label='Share on Linkedin'
          onClick={() => windowsOpen(`https://www.linkedin.com/sharing/share-offsite/?url=${link}`)}
        >
          <LinkedinSvg />
        </a>
      )
    case 'twitter':
      return (
        <a
          className={styles.link}
          aria-label='Share on Twitter'
          onClick={() =>
            windowsOpen(
              `https://twitter.com/intent/tweet?url=${link}&text=${description}&hashtags=${tags}&via=FingerprintJS`
            )
          }
        >
          <TwitterSvg />
        </a>
      )
    case 'facebook':
      return (
        <a
          className={classNames(styles.link, styles.fbIcon)}
          aria-label='Share on Facebook'
          onClick={() => windowsOpen(`https://www.facebook.com/sharer.php?u=${link}`)}
        >
          <FacebookSvg />
        </a>
      )
    case 'shareLink':
      return (
        <button
          className={styles.button}
          onClick={() => {
            copyToClipboard(link)
          }}
        >
          <ShareSvg />
        </button>
      )
  }
}
