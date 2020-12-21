import React from 'react'
import { Link } from 'gatsby'
import nav from './Navbar.module.scss'
import Container from '../common/Container'
import { PATH, DOC_URL, URL, MAILTO } from '../../constants/content'

export default function Navbar() {
  return (
    <div className={nav.top}>
      <Container size='large'>
        <nav className={nav.secondary}>
          <Link className={nav.link} to={PATH.demoUrl}>
            Technical Demo
          </Link>
          <a className={nav.link} href={URL.githubRepoUrl} target='_blank' rel='noreferrer'>
            Open Source
          </a>
          <Link className={nav.link} to={PATH.pricingUrl}>
            Pricing
          </Link>
          <a className={nav.link} href={DOC_URL.documentationUrl}>
            Documentation
          </a>
          <a className={nav.link} href={MAILTO.mailToUrl}>
            Support
          </a>
          <a className={nav.link} href={URL.dashboardLoginUrl} target='_blank' rel='noreferrer'>
            Log In
          </a>
        </nav>
      </Container>
    </div>
  )
}
