import React from 'react'
import styles from './Section.module.scss'
import classNames from 'classnames'

export default function Section({ children, classes }: { children: React.ReactNode; classes?: string | string[] }) {
  return <section className={classNames(styles.section, classes)}>{children}</section>
}
