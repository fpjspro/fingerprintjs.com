import React from 'react'
import Button from '../../../common/Button'
import Container from '../../../common/Container'
import SubHeaderComponent from '../../SubHeader'

import styles from './Header.module.scss'

export interface HeaderProps {
  subLabel: string
  subTitle: string
  description: string | React.ReactNode
}
export default function Header({ subLabel, subTitle, description }: HeaderProps) {
  return (
    <Container size='large' className={styles.container}>
      <SubHeaderComponent
        label={{ text: subLabel, size: 'medium' }}
        title={{
          text: subTitle,
          size: 'large',
          weight: 'primary',
        }}
        align='left'
        className={styles.header}
      />

      <div className={styles.subHeader}>
        {description}
        <Button href='/pdf/case-study/account-sharing.pdf' variant='faded' className={styles.downloadPdf} download>
          Download the PDF
        </Button>
      </div>
    </Container>
  )
}
