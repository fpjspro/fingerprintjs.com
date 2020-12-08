import React from 'react'
import classNames from 'classnames'
import BackgroundImage, { IBackgroundImageProps } from 'gatsby-background-image'

import styles from './Section.module.scss'

export interface SectionProps {
  children: React.ReactNode
  className?: string | string[]
  backgroundImageFluid?: IBackgroundImageProps['fluid']
  backgroundImageFixed?: IBackgroundImageProps['fixed']
}
export default function Section({ children, className, backgroundImageFluid, backgroundImageFixed }: SectionProps) {
  return backgroundImageFluid || backgroundImageFixed ? (
    <BackgroundImage
      className={classNames(styles.section, className)}
      Tag='section'
      fluid={backgroundImageFluid}
      fixed={backgroundImageFixed}
      backgroundColor='#fff'
    >
      {children}
    </BackgroundImage>
  ) : (
    <section className={classNames(styles.section, className)}>{children}</section>
  )
}
