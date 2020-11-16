import React from 'react'
import styles from './ToolsTextBlock.module.scss'

interface ToolsTextBlockProps {
  title: string
  text: string
  icon?: React.ReactElement
}

export default function ToolsTextBlock({ title, text, icon }: ToolsTextBlockProps) {
  let iconWithProps: React.ReactElement | undefined

  if (icon) {
    iconWithProps = React.cloneElement(icon as React.ReactElement, { className: styles.icon })
  }

  return (
    <div className={styles.item}>
      {iconWithProps && <div className={styles.iconContainer}>{iconWithProps}</div>}
      <h3 className={styles.title}>&gt; {title}</h3>
      <p className={styles.description}>{text}</p>
    </div>
  )
}
