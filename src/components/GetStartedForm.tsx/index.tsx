import React, {useState} from 'react'
import {ReactComponent as ChevronRightSvg} from './chevron-right.svg';
import {ReactComponent as CheckSvg} from './check.svg';
import {ReactComponent as CloseSvg} from './close.svg';

export default function GetStartedForm({onSubmit}: {onSubmit: (email: string) => void}) {
  const [email, setEmail] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email);
  }

  return (
    <form className='form form--get-started' onSubmit={handleSubmit}>
      <div className='field field-with-button'>
        <label htmlFor='email' className='label'>
          <input 
            type='email' 
            name='email' 
            required 
            className='input gtm-email-input' 
            placeholder='Enter your email'
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </label>
        <button className='btn submit gtm-get-started-btn' type='submit'>
          <span className='btn__label btn__label--desktop-only gtm-get-started-btn'>
            Get Started
          </span>
          <ChevronRightSvg className='btn__icon btn__icon--mobile-only gtm-get-started-btn'/>
        </button>
      </div>
      <div className='form-state form-state--success'>
        <CheckSvg className='form-state__icon'/>
        <div className='form-state__label'>
          We sent you a link to start your trial
        </div>
      </div>
      <div className='form-state form-state--failed'>
        <CloseSvg className='form-state__icon'/>
        <div className='form-state__label form-failed-reason'>
          Submit failed. Please try again.
        </div>
      </div>
      <ul className='form-description'>
        <li>
          <CheckSvg/>
          10 Day Trial
        </li>
        <li>
          <CheckSvg/>
          Cancel Any Time
        </li>
        <li>
          <CheckSvg/>
          API &amp; Webhooks
        </li>
      </ul>
    </form>
  )
}
