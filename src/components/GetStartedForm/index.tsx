import React, { useContext, useState } from 'react'
import { ReactComponent as ChevronRightSvg } from '../../img/chevron-right.svg'
import { ReactComponent as CheckSvg } from '../../img/check.svg'
import { ReactComponent as CloseSvg } from '../../img/close.svg'
import styles from './GetStartedForm.module.scss'
import classNames from 'classnames'
import Button from '../common/Button'
import { FormState } from '../../types/FormState'
import { GATSBY_FPJS_DASHBOARD_ENDPOINT } from '../../constants/env'
import { useVisitorData } from '../../context/FpjsContext'
import { sendEvent } from '../../utils/gtm'
import FormContext from '../../context/FormContext'

interface GetStartedFormProps {
  className?: string | string[]
}

export default function GetStartedForm({ className }: GetStartedFormProps) {
  const { visitorData } = useVisitorData()
  const visitorId = visitorData?.visitorId
  const dashboardEndpoint = GATSBY_FPJS_DASHBOARD_ENDPOINT
  const [email, setEmail] = useState('')
  const { formState, errorMessage, updateFormState, updateErrorMessage } = useContext(FormContext)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateFormState(FormState.loading)

    const { ok, error } = await fetch(`${dashboardEndpoint}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, fpjsVisitorId: visitorId }),
    }).then((response) => response.json())

    if (!ok) {
      updateErrorMessage(error.message || 'Something gone wrong. Please try again later.')
      updateFormState(FormState.failed)
      setTimeout(() => {
        updateFormState(FormState.default)
      }, 2500)
    } else {
      updateFormState(FormState.success)
      sendEvent({ event: 'signupintent.success' })
    }
  }

  return (
    <form
      className={classNames(
        className,
        styles.form,
        styles.getStarted,
        { [styles.success]: formState === FormState.success },
        { [styles.failed]: formState === FormState.failed },
        { [styles.loading]: formState === FormState.loading }
      )}
      onSubmit={handleSubmit}
    >
      {(formState === FormState.default || formState === FormState.loading) && (
        <div className={classNames(styles.field, styles.withButton)}>
          <label htmlFor='email' className={styles.label}>
            <input
              type='email'
              name='email'
              required
              className={classNames(styles.field, 'gtm-email-input')}
              placeholder='Enter your email'
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </label>
          <Button
            className={classNames(styles.submit, 'gtm-get-started-btn')}
            type='submit'
            mobileIcon={<ChevronRightSvg className='gtm-get-started-btn' />}
          >
            Get Started
          </Button>
        </div>
      )}
      {formState === FormState.success && (
        <div className={classNames(styles.state, styles.success)}>
          <CheckSvg className={styles.icon} />
          <div className={styles.label}>We sent you a link to start your trial</div>
        </div>
      )}
      {formState === FormState.failed && (
        <div className={classNames(styles.state, styles.failed)}>
          <CloseSvg className={styles.icon} />
          <div className={styles.label}>{errorMessage}</div>
        </div>
      )}
      <ul className={styles.description}>
        <li>
          <CheckSvg />
          10 Day Trial
        </li>
        <li>
          <CheckSvg />
          Cancel Any Time
        </li>
        <li>
          <CheckSvg />
          API &amp; Webhooks
        </li>
      </ul>
    </form>
  )
}
