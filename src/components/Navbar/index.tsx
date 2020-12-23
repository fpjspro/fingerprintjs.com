import React from 'react'
import nav from './Navbar.module.scss'
import Container from '../common/Container'
import { DOC_URL, URL, MAILTO, PATH } from '../../constants/content'

export default function Navbar() {
  return (
    <div className={nav.top}>
      <Container size='large'>
        <nav className={nav.secondary}>
          <Link className={nav.link} to={PATH.demoUrl}>
            Technical Demo
          </Link>
          <Link className={nav.link} to={PATH.blog}>
            Blog
          </Link>
          <a className={nav.link} href={URL.githubRepoUrl} target='_blank' rel='noreferrer'>
            Open Source
          </a>
          <Link className={nav.link} to={PATH.pricingUrl}>
            Pricing
          </Link>
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
