import React from 'react'
import GetStartedForm from '../../GetStartedForm'
import Container from '../../common/Container'
import Section from '../../common/Section'
import signupImage from '../../../img/TEMP_signup_image.png'
import BackgroundImage from 'gatsby-background-image'
import { useBackgroundImage } from '../../../hooks/useBackgroundImage'

import styles from './SignupSection.module.scss'

export default function SignupSection() {
  const { mainBackground } = useBackgroundImage()

  return (
    <Section className={styles.section}>
      <Container size='large' className={styles.container}>
        <div className={styles.form}>
          <h2 className={styles.header}>
            <strong className={styles.strong}>Sign Up</strong> Today!
          </h2>
          <GetStartedForm />
        </div>

        <BackgroundImage Tag='span' className={styles.background} fluid={mainBackground}>
          <img alt='Stylized FingerprintJS widget' src={signupImage} className={styles.image} />
        </BackgroundImage>
      </Container>
    </Section>
  )
}
