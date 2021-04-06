import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'
deckDeckGoHighlightElement()

import styles from './Content.module.scss'

export function DangerouslyRenderHtmlContent({ content, className }: { content: string; className?: string }) {
  return <div className={classNames(styles.root, className)} dangerouslySetInnerHTML={{ __html: content }} />
}

export function Content({ content, className }: { content: string | React.ReactNode; className?: string }) {
  return <div className={classNames(styles.root, className)}>{content}</div>
}

export function MarkdownContent({ markdown, className }: { markdown: string; className?: string }) {
  const [htmlString, setHtmlString] = useState('')

  useEffect(() => {
    async function parseMarkdown(markdown: string) {
      const remark = await import('remark')
      const remarkHTML = await import('remark-html')

      setHtmlString(remark.default().use(remarkHTML.default).processSync(markdown).toString())
    }

    parseMarkdown(markdown)
  }, [markdown])

  return <DangerouslyRenderHtmlContent content={htmlString} className={className} />
}
