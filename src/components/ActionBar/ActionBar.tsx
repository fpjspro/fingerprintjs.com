import React from 'react'

import styles from './ActionBar.module.scss'
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
  switch (socialMedia) {
    case 'linkedin':
      return (
        <a
          className={styles.link}
          aria-label='Share on Linkedin'
          onClick={() =>
            window.open(
              `https://www.linkedin.com/sharing/share-offsite/?url=${link}`,
              '',
              '_blank, width=560, height=745, resizable=yes, scrollbars=yes'
            )
          }
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
            window.open(
              `https://twitter.com/intent/tweet?url=${link}&text=${description}&hashtags=${tags}&via=FingerprintJS`,
              '',
              '_blank, width=560, height=745, resizable=yes, scrollbars=yes'
            )
          }
        >
          <TwitterSvg />
        </a>
      )
    case 'facebook':
      return (
        <a
          className={styles.link}
          aria-label='Share on Facebook'
          onClick={() =>
            window.open(
              `https://www.facebook.com/sharer.php?u=${link}`,
              '',
              '_blank, width=560, height=745, resizable=yes, scrollbars=yes'
            )
          }
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
