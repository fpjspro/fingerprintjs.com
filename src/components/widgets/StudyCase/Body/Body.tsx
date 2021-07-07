import React from 'react'
import Section from '../../../../components/common/Section'
import { Content } from '../../../../components/Content/Content'
import Container from '../../../common/Container'

import styles from './Body.module.scss'

export interface BodyProps {
  body: string | React.ReactNode
}
export default function Body({ body }: BodyProps) {
  return (
    <Section className={styles.section}>
      <Container size='large' className={styles.container}>
        <Content className={styles.body} content={body} />
      </Container>
    </Section>
  )
}
