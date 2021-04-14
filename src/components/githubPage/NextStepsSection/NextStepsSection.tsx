import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { PATH } from '../../../constants/content'

import styles from './NextStepsSection.module.scss'

export default function NextStepsSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container}>
        <h1 className={styles.title}>Next Steps with FingerprintJS Pro</h1>
      </Container>
    </Section>
  )
}

interface StepProps {
  title: string
  children: string
  link: string
}
function Step({ title, children, link }: StepProps) {
  return (
    <>
      <div>
        <td className={styles.featureColumn}>
          <strong>{feature}</strong>
          {children && <div className={styles.description}>{children}</div>}
        </td>
        <td className={classNames(styles.versionColumn, { [styles.versionColumnStrong]: isSymbol })}>{oss}</td>
        <td className={classNames(styles.versionColumn, { [styles.versionColumnStrong]: isSymbol })}>{pro}</td>
      </div>
    </>
  )
}
