import React from 'react'
import { Link } from 'gatsby'
import { ReactComponent as LinkedInSvg } from '../../img/linkedin.svg'
import { ReactComponent as TwitterSvg } from '../../img/twitter.svg'
import GithubButton from '../GithubButton'
import Container from '../common/Container'
import Button from '../common/Button'
import styles from './MobileNavbar.module.scss'
import classNames from 'classnames'

export default function MobileNavbar() {
  return (
    <div className={styles.nav}>
      <Container size='large' className={styles.container}>
        <div className={classNames(styles.links, styles.top)}>
          <Button href='mailto:sales@fingerprintjs.com' variant='outline'>
            Contact Sales
          </Button>
          <Button href='https://dashboard.fingerprintjs.com/signup'>Free Trial</Button>
        </div>
        <div className={classNames(styles.links, styles.main)}>
          <Container size='large' className={styles.container}>
            {' '}
            <Link to='/demo' className={styles.link}>
              Technical Demo
            </Link>
            <a
              href='https://github.com/fingerprintjs/fingerprintjs'
              target='_blank'
              rel='noreferrer'
              className={styles.link}
            >
              Open Source
            </a>
            <Link to='/pricing' className={styles.link}>
              Pricing
            </Link>
            <a href='https://dev.fingerprintjs.com' className={styles.link}>
              Documentation
            </a>
            <a href='mailto:support@fingerprintjs.com' className={styles.link}>
              Support
            </a>
            <a href='https://dashboard.fingerprintjs.com/login' className={styles.link}>
              Log In
            </a>
            <a href='https://dashboard.fingerprintjs.com/signup' className={styles.link}>
              Sign Up
            </a>
          </Container>
        </div>
        <div className={styles.contact}>
          <GithubButton />
          <div className={styles.social}>
            <small>Find us on social</small>
            <ul className={styles.links}>
              <li className={styles.link}>
                <a
                  href='https://www.linkedin.com/company/fingerprintjs/'
                  target='_blank'
                  rel='noreferrer'
                  aria-label='LinkedIn link'
                >
                  <LinkedInSvg />
                </a>
              </li>
              <li className={styles.link}>
                <a href='https://twitter.com/FingerprintJs' target='_blank' rel='noreferrer' aria-label='Twitter link'>
                  <TwitterSvg />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}
