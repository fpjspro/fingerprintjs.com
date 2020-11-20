import React, { useEffect, useState } from 'react'
import GetStartedForm from '../../components/GetStartedForm'
import { FormState } from '../../types/FormState'
import Container from '../../components/common/Container'
import signupImage from '../../img/TEMP_signup_image.png'
import { Region, GetOptions } from '@fingerprintjs/fingerprintjs-pro'
import { sendEvent } from '../../utils/gtm'
import styles from './Signup.module.scss'

const config: GetOptions<true, 'full'> = {
  ipResolution: 'full',
  extendedResult: true,
  timeout: 30_000,
}

export default function SignupSection() {
  const dashboardEndpoint = process.env.GATSBY_FPJS_DASHBOARD_ENDPOINT

  // TODO This should be changed to get the visitor ID through a provider when it's available.
  const clientToken = process.env.GATSBY_FPJS_TOKEN ?? 'test_client_token'
  const endpoint = process.env.GATSBY_FPJS_ENDPOINT ?? ''
  const region = process.env.GATSBY_FPJS_REGION as Region

  const [visitorId, setVisitorId] = useState('')

  useEffect(() => {
    async function getVisitorId() {
      const FP = await import('@fingerprintjs/fingerprintjs-pro')
      const fp = await FP.load({ token: clientToken, endpoint, region })
      const result = await fp.get(config)

      setVisitorId(result.visitorId)
    }

    getVisitorId()
  }, [clientToken, endpoint, region])

  const [formState, setFormState] = useState(FormState.default)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (email: string) => {
    setFormState(FormState.loading)

    const { ok, error } = await fetch(`${dashboardEndpoint}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, fpjsVisitorId: visitorId }),
    }).then((response) => response.json())

    if (!ok) {
      setErrorMessage(error.message || 'Something gone wrong. Please try again later.')
      setFormState(FormState.failed)
      setTimeout(() => {
        setFormState(FormState.default)
      }, 2500)
    } else {
      setFormState(FormState.success)
      sendEvent({ event: 'signupintent.success' })
    }
  }

  return (
    <Container size='large' className={styles.signup}>
      <div className={styles.form}>
        <h2 className={styles.header}>
          <strong className={styles.strong}>Sign Up</strong> Today!
        </h2>
        <GetStartedForm formState={formState} errorMessage={errorMessage} onSubmit={onSubmit} />
      </div>

      <img alt='Stylized FingerprintJS widget' src={signupImage} className={styles.image} />
    </Container>
  )
}
