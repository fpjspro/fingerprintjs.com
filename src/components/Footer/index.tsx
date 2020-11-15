import React from 'react'
import { Link } from 'gatsby'
import GithubButton from '../GithubButton';
import {ReactComponent as LinkedInSvg} from '../../img/linkedin.svg';
import {ReactComponent as TwitterSvg} from '../../img/twitter.svg';
import Container from '../common/Container';
import styles from './Footer.module.scss';

interface FooterLinkSection {
  title: string;
  links: {title: string, url: string, isLocal?: boolean}[];
}

const footerLinks: FooterLinkSection[] = [
  {
    title: "General",
    links: [
      {
        title: "Technical Demo",
        url: "/demo",
        isLocal: true,
      },
      {
        title: "Open Source",
        url: "https://github.com/fingerprintjs/fingerprintjs"
      },
      {
        title: "Pricing",
        url: "/pricing",
        isLocal: true,
      },
      {
        title: "Support",
        url: "mailto:support@fingerprintjs.com"
      },
      {
        title: "Terms of Use",
        url: "https://dev.fingerprintjs.com/docs/terms-of-service"
      },
      {
        title: "Privacy Policy",
        url: "https://dev.fingerprintjs.com/docs/privacy-policy"
      },
      {
        title: "Careers",
        url: "https://fingerprintjs.breezy.hr/"
      },
      {
        title: "Log In",
        url: "https://dashboard.fingerprintjs.com/login"
      }
    ]
  },
  {
    title: "Docs",
    links: [
      {
        title: "Get Started",
        url: "https://dev.fingerprintjs.com/docs/introduction"
      },
      {
        title: "Pro vs Free Version",
        url: "https://dev.fingerprintjs.com/docs/pro-vs-free"
      },
      {
        title: "Browser Fingerprinting",
        url: "https://dev.fingerprintjs.com/docs/browser-fingerprinting"
      },
      {
        title: "Incognito Mode Detection",
        url: "https://dev.fingerprintjs.com/docs/incognito-private-mode-detection"
      },
      {
        title: "Bot Detection",
        url: "https://dev.fingerprintjs.com/docs/bot-detection"
      },
      {
        title: "Server API",
        url: "https://dev.fingerprintjs.com/docs/server-api"
      },
      {
        title: "Legal",
        url: "https://dev.fingerprintjs.com/docs/dpa-gdpr"
      }
    ]
  }
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container size='large'>
        <nav className={styles.nav}>
          <div className={styles.wrapper}>
            {footerLinks.map(({title, links}) => {
              return (
                <div key={title} className={styles.menu}>
                <h3 className={styles.title}>{title}</h3>
                    {links.map(({title, url, isLocal}) => {
                      return isLocal ? (
                          <Link className={styles.link}
                            key={url} 
                            to={url} 
                            target='_blank' 
                            rel='noopener'>
                            {title}
                          </Link>
                      ) : (
                          <a className={styles.link}
                            key={url} 
                            href={url} 
                            target='_blank' 
                            rel='noopener'>
                            {title}
                          </a>
                      )
                    })}
                </div>
              ) 
            })}
          </div>

          <div className={styles.contact}>
            <h3 className={styles.title}>
              FingerprintJS
            </h3>
            <address className={styles.address}>
              1440 W. Taylor St #735, Chicago, IL 60607, USA
              <br/><br/>
              <a
                href="javascript:location='mailto:\u0073\u0075\u0070\u0070\u006f\u0072\u0074\u0040\u0066\u0069\u006e\u0067\u0065\u0072\u0070\u0072\u0069\u006e\u0074\u006a\u0073\u002e\u0063\u006f\u006d';void 0"
                dangerouslySetInnerHTML={{__html:
`<script type='text/javascript'>
  document.write(
    '\u0073\u0075\u0070\u0070\u006f\u0072\u0074\u0040\u0066\u0069\u006e\u0067\u0065\u0072\u0070\u0072\u0069\u006e\u0074\u006a\u0073\u002e\u0063\u006f\u006d'
  )
</script>`
                }}
              >
              </a>
            </address>
            <div className={styles.social}>
              <GithubButton/>
              <div>
                <small>
                  Find us on social
                </small>
                <ul className={styles.links}>
                  <li className={styles.link}>
                    <a href='https://www.linkedin.com/company/fingerprintjs/' target='_blank' rel='noopener'>
                      <LinkedInSvg/>
                    </a>
                  </li>
                  <li className={styles.link}>
                    <a href='https://twitter.com/FingerprintJs' target='_blank' rel='noopener'>
                      <TwitterSvg/>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div className={styles.copyrights}>
          &copy; 2020 FingerprintJS, Inc
        </div>
      </Container>
    </footer>
  )
}
