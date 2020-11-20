import React, { useState } from 'react'
import Button from '../../components/common/Button'
import { ReactComponent as ChevronRightSvg } from '../../img/chevron-right.svg'
import { ReactComponent as CheckSvg } from '../../img/check.svg'
import { ReactComponent as CloseSvg } from '../../img/close.svg'
import { FormState } from '../../types/FormState'
import { sendEvent } from '../../utils/gtm'
import classNames from 'classnames'
import styles from './ContactSalesForm.module.scss'

interface ContactSalesFormProps {
  className?: string | string[]
}
export default function ContactSalesForm({ className }: ContactSalesFormProps) {
  const submitEndpoint = process.env.FPJS_LEAD_URL

  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [formState, setFormState] = useState(FormState.default)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    setFormState(FormState.loading)

    const { ok, error } = await fetch(submitEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        website,
        name: email,
      }),
    }).then((response) => response.json())

    if (!ok) {
      setErrorMessage(error.message || 'Something went wrong. Please try again later.')
      setFormState(FormState.failed)
      setTimeout(() => {
        setFormState(FormState.default)
      }, 2500)
      sendEvent({ event: 'leadSubmit.error' })
    } else {
      setFormState(FormState.success)
      sendEvent({ event: 'leadSubmit.success' })
    }
  }

  return (
    <form
      className={classNames(
        className,
        styles.contactSalesForm,
        { [styles.success]: formState === FormState.success },
        { [styles.failed]: formState === FormState.failed },
        { [styles.loading]: formState === FormState.loading }
      )}
      onSubmit={handleSubmit}
    >
      {(formState === FormState.default || formState === FormState.loading) && (
        <div className={styles.form}>
          <label htmlFor='email' className={styles.label}>
            Email:
            <input
              type='email'
              name='email'
              required
              className={styles.input}
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={formState === FormState.loading}
            />
          </label>
          <label htmlFor='website' className={styles.label}>
            Website:
            <input
              type='url'
              name='website'
              required
              className={styles.input}
              placeholder='Enter your website'
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              disabled={formState === FormState.loading}
            />
          </label>

          <Button
            className={styles.button}
            type='submit'
            mobileIcon={<ChevronRightSvg className={styles.mobileIcon} />}
            disabled={formState === FormState.loading}
          >
            {formState === FormState.loading ? 'Sending...' : 'Send'}
          </Button>
        </div>
      )}

      {formState === FormState.success && (
        <div className={classNames(styles.state, styles.success)}>
          <div className={styles.message}>Thank you! Our sales team will be in contact with you shortly.</div>
          <CheckSvg className={styles.icon} />
        </div>
      )}

      {formState === FormState.failed && (
        <div className={classNames(styles.state, styles.failed)}>
          <div className={styles.message}>{errorMessage}</div>
          <CloseSvg className={styles.icon} />
        </div>
      )}
    </form>
  )
}
