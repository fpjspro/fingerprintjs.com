import React from 'react'
import { Link } from 'gatsby'
import nav from './Navbar.module.scss'
import Container from '../common/Container'
import {
  demoUrl,
  pricingUrl,
  githubRepoUrl,
  documentationUrl,
  mailToUrl,
  dashboardLoginUrl,
} from '../../constants/content'

export default function Navbar() {
  return (
    <div className={nav.top}>
      <Container size='large'>
        <nav className={nav.secondary}>
          <Link className={nav.link} to={demoUrl}>
            Technical Demo
          </Link>
          <a className={nav.link} href={githubRepoUrl} target='_blank' rel='noreferrer'>
            Open Source
          </a>
          <Link className={nav.link} to={pricingUrl}>
            Pricing
          </Link>
          <a className={nav.link} href={documentationUrl}>
            Documentation
          </a>
          <a className={nav.link} href={mailToUrl}>
            Support
          </a>
          <a className={nav.link} href={dashboardLoginUrl} target='_blank' rel='noreferrer'>
            Log In
          </a>
        </nav>
      </Container>
    </div>
  )
}
