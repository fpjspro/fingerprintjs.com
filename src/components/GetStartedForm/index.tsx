import React, {useState} from 'react'
import {ReactComponent as ChevronRightSvg} from './chevron-right.svg';
import {ReactComponent as CheckSvg} from './check.svg';
import {ReactComponent as CloseSvg} from './close.svg';
import styles from './GetStartedForm.module.scss';
import classNames from 'classnames';
import Button from '../common/Button';

interface GetStartedFormProps {
  className?: string | string[];
  onSubmit: (email: string) => void;
}

export default function GetStartedForm({className, onSubmit}: GetStartedFormProps) {
  const [email, setEmail] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(email)
  }

  return (
    <form 
      className={classNames(className, styles.form, styles.getStarted)} 
      onSubmit={handleSubmit}>
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
          mobileIcon={<ChevronRightSvg className='gtm-get-started-btn'/>}>
          Get Started
        </Button>
      </div>
      <div className={classNames(styles.state, styles.success)}>
        <CheckSvg className={styles.icon}/>
        <div className={styles.label}>
          We sent you a link to start your trial
        </div>
      </div>
      <div className={classNames(styles.state, styles.failed)}>
        <CloseSvg className={styles.icon}/>
        <div className={styles.label}>
          {/* TODO: add error message */}
          Something gone wrong. Please try again later.
        </div>
      </div>
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
