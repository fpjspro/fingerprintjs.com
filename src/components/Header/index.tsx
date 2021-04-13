import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import { Link } from 'gatsby'
import Prism from 'prismjs'
import GithubButton from '../GithubButton'
import { ReactComponent as BurgerSvg } from './burger.svg'
import MobileNavbar from '../MobileNavbar'
import Button from '../common/Button'
import Container from '../common/Container'
import { isBrowser } from '../../helpers/detector'
import Modal from '../../components/common/Modal'
import ContactSalesForm from '../../components/ContactSalesForm'
import { useCaseLinks } from '../../constants/content'
import classNames from 'classnames'
import { URL } from '../../constants/content'
import DropdownList from './DropdownList'
import { useUtmParams } from '../../hooks/useUtmParams'
import { buildQueryString } from '../../helpers/common'
import { ReactComponent as LogoSvg } from './fpjs.svg'
import { trackNavSignupClick } from '../../helpers/gtm'

import styles from './Header.module.scss'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isContactSalesModalOpen, setIsContactSalesModalOpen] = useState(false)

  const utmInfo = useUtmParams()

  useEffect(() => {
    const mobileBodyClass = 'isMobileMenuOpen'
    if (isBrowser && isMobileMenuOpen) {
      document.body.classList.add(mobileBodyClass)
    } else {
      document.body.classList.remove(mobileBodyClass)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <header className={styles.header}>
        <Navbar />
        <div className={styles.nav}>
          <Container size='large'>
            <nav className={styles.navMain}>
              <div className={styles.navLeft}>
                <Link to='/' className={`${styles.link} ${styles.linkLogo}`} title='Logo'>
                  <LogoSvg className={styles.logo} />
                </Link>
                <Link className={classNames(styles.link, styles.desktopOnly)} to='/why-fpjs/'>
                  Why Us
                </Link>
                <DropdownList name='Use Cases' list={useCaseLinks} />
                <Link className={classNames(styles.link, styles.desktopOnly)} to='/demo/'>
                  Demo
                </Link>
                <Link className={classNames(styles.link, styles.desktopOnly)} to='/pricing/'>
                  Pricing
                </Link>
              </div>
              <div className={styles.navRight}>
                <GithubButton className={styles.desktopOnly} />
                <Button
                  onClick={() => setIsContactSalesModalOpen(true)}
                  variant='outline'
                  className={classNames(styles.desktopOnly, styles.button)}
                >
                  Contact Sales
                </Button>
                <Button href={`${URL.signupUrl}${buildQueryString(utmInfo)}`} onClick={() => trackNavSignupClick()}>
                  Sign Up, It’s Free
                </Button>
                <Button
                  label='Mobile Menu'
                  className={styles.mobileToggler}
                  variant='clear'
                  onClick={handleToggleMobileMenu}
                >
                  <BurgerSvg className={styles.buttonIcon} />
                </Button>
              </div>
            </nav>
          </Container>
        </div>
        {isMobileMenuOpen && <MobileNavbar />}
      </header>

      <Modal title='Contact Sales' open={isContactSalesModalOpen} onClose={() => setIsContactSalesModalOpen(false)}>
        <ContactSalesForm />
      </Modal>
    </>
  )
}
