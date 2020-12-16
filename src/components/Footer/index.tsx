import React from 'react'
import { Link } from 'gatsby'
import GithubButton from '../GithubButton'
import { ReactComponent as LinkedInSvg } from '../../img/linkedin.svg'
import { ReactComponent as TwitterSvg } from '../../img/twitter.svg'
import Container from '../common/Container'
import styles from './Footer.module.scss'
import {
  demoUrl,
  pricingUrl,
  githubRepoUrl,
  mailToUrl,
  dashboardLoginUrl,
  termOfUseUrl,
  privacyPolicyUrl,
  careersUrl,
  getStartedUrl,
  proVsFreeUrl,
  browserFingerprintUrl,
  incognitoUrl,
  serverApiUrl,
  legalUrl,
  linkedinUrl,
  twitterUrl,
} from '../../constants/content'

interface FooterLinkSection {
  title: string
  links: { title: string; url: string; isLocal?: boolean }[]
}

const footerLinks: FooterLinkSection[] = [
  {
    title: 'General',
    links: [
      {
        title: 'Technical Demo',
        url: `${demoUrl}`,
        isLocal: true,
      },
      {
        title: 'Open Source',
        url: `${githubRepoUrl}`,
      },
      {
        title: 'Pricing',
        url: `${pricingUrl}`,
        isLocal: true,
      },
      {
        title: 'Support',
        url: `${mailToUrl}`,
      },
      {
        title: 'Terms of Use',
        url: `${termOfUseUrl}`,
      },
      {
        title: 'Privacy Policy',
        url: `${privacyPolicyUrl}`,
      },
      {
        title: 'Careers',
        url: `${careersUrl}`,
      },
      {
        title: 'Log In',
        url: `${dashboardLoginUrl}`,
      },
    ],
  },
  {
    title: 'Docs',
    links: [
      {
        title: 'Get Started',
        url: `${getStartedUrl}`,
      },
      {
        title: 'Pro vs Free Version',
        url: `${proVsFreeUrl}`,
      },
      {
        title: 'Browser Fingerprinting',
        url: `${browserFingerprintUrl}`,
      },
      {
        title: 'Incognito Mode Detection',
        url: `${incognitoUrl}`,
      },
      {
        title: 'Server API',
        url: `${serverApiUrl}`,
      },
      {
        title: 'Legal',
        url: `${legalUrl}`,
      },
    ],
  },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container size='large'>
        <nav className={styles.nav}>
          <div className={styles.wrapper}>
            {footerLinks.map(({ title, links }) => {
              return (
                <div key={title} className={styles.menu}>
                  <h3 className={styles.title}>{title}</h3>
                  {links.map(({ title, url, isLocal }) => {
                    return isLocal ? (
                      <Link className={styles.link} key={url} to={url} target='_blank' rel='noreferrer'>
                        {title}
                      </Link>
                    ) : (
                      <a className={styles.link} key={url} href={url} target='_blank' rel='noreferrer'>
                        {title}
                      </a>
                    )
                  })}
                </div>
              )
            })}
          </div>

          <div className={styles.contact}>
            <h3 className={styles.title}>FingerprintJS</h3>
            <address className={styles.address}>
              1440 W. Taylor St #735, Chicago, IL 60607, USA
              <br />
              <br />
              <a
                className={styles.link}
                href="mailto:\u0073\u0075\u0070\u0070\u006f\u0072\u0074\u0040\u0066\u0069\u006e\u0067\u0065\u0072\u0070\u0072\u0069\u006e\u0074\u006a\u0073\u002e\u0063\u006f\u006d'"
              >
                support@fingerprintjs.com
              </a>
            </address>
            <div className={styles.social}>
              <GithubButton />
              <div>
                <small>Find us on social</small>
                <ul className={styles.links}>
                  <li className={styles.link}>
                    <a href={linkedinUrl} target='_blank' rel='noreferrer' aria-label='LinkedIn link'>
                      <LinkedInSvg />
                    </a>
                  </li>
                  <li className={styles.link}>
                    <a href={twitterUrl} target='_blank' rel='noreferrer' aria-label='Twitter link'>
                      <TwitterSvg />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div className={styles.copyrights}>&copy; 2020 FingerprintJS, Inc</div>
      </Container>
    </footer>
  )
}
