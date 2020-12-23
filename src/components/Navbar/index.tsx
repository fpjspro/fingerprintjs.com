import React from 'react'
import nav from './Navbar.module.scss'
import Container from '../common/Container'
import { DOC_URL, URL, MAILTO } from '../../constants/content'

export default function Navbar() {
  return (
    <div className={nav.top}>
      <Container size='large'>
        <nav className={nav.secondary}>
          <a className={nav.link} href={DOC_URL.documentationUrl}>
            Docs
          </a>
          <a className={nav.link} href={MAILTO.mailToUrl}>
            Support
          </a>
          <a className={nav.link} href={URL.dashboardLoginUrl} target='_blank' rel='noreferrer'>
            Login
          </a>
        </nav>
      </Container>
    </div>
  )
}
