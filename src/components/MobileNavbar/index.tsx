import React from 'react'
import { Link } from 'gatsby'
import {ReactComponent as LinkedInSvg} from '../../img/linkedin.svg';
import {ReactComponent as TwitterSvg} from '../../img/twitter.svg';
import GithubButton from '../GithubButton';

export default function MobileNavbar() {
  return (
    <div className='mobile-nav'>
      <div className='container container--large'>
        <div className='top-links'>
          <a href='mailto:sales@fingerprintjs.com' className='btn btn--outlined'>
            Contact Sales
          </a>
          <a href='https://dashboard.fingerprintjs.com/signup' className='btn'>
            Free Trial
          </a>
        </div>
        <div className='main-links'>
          <div className='container container--large' style={{'padding': 0}}>
            <Link to='/demo' className='nav__link'>
              Technical Demo
            </Link>
            <a href='{{site.repo_link}}' target='_blank' rel='noopener' className='nav__link'>
              Open Source
            </a>
            <Link to='/pricing' className='nav__link'>
              Pricing
            </Link>
            <a href='https://dev.fingerprintjs.com' className='nav__link'>
              Documentation
            </a>
            <a href='mailto:support@fingerprintjs.com' className='nav__link'>
              Support
            </a>
            <a href='https://dashboard.fingerprintjs.com/login' className='nav__link'>
              Log In
            </a>
            <a href='https://dashboard.fingerprintjs.com/signup' className='nav__link'>
              Sign Up
            </a>
          </div>
        </div>
        <div className='contact-social'>
          <GithubButton/>
          <div className='social'>
            <small>
              Find us on social
            </small>
            <ul className='social-links'>
              <li className='social-links__link'>
                <a href='https://www.linkedin.com/company/fingerprintjs/' target='_blank' rel='noopener'>
                  <LinkedInSvg/>
                </a>
              </li>
              <li className='social-links__link'>
                <a href='https://twitter.com/FingerprintJs' target='_blank' rel='noopener'>
                  <TwitterSvg/>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
