import React from 'react'
import styles from './Section.module.scss'
import classNames from 'classnames'

export default function Section({ children, className }: { children: React.ReactNode; className?: string | string[] }) {
  return <section className={classNames(styles.section, className)}>{children}</section>
}
