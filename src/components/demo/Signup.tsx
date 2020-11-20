import React from 'react'
import GetStartedForm from '../../components/GetStartedForm'
import Container from '../../components/common/Container'
import signupImage from '../../img/TEMP_signup_image.png'
import styles from './Signup.module.scss'

export default function SignupSection() {
  return (
    <Container size='large' className={styles.signup}>
      <div className={styles.form}>
        <h2 className={styles.header}>
          <strong className={styles.strong}>Sign Up</strong> Today!
        </h2>
        <GetStartedForm />
      </div>

      <img alt='Stylized FingerprintJS widget' src={signupImage} className={styles.image} />
    </Container>
  )
}
