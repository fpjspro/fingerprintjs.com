import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import { Link, navigate } from 'gatsby'
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
import { useQueryParams } from '../../hooks/useQueryParams'
import { useLocation } from '@reach/router'

import styles from './Header.module.scss'
import { buildQueryString } from '../../helpers/common'

export default function Header() {
  const location = useLocation()
  const queryParams = useQueryParams()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isContactSalesModalOpen, setIsContactSalesModalOpen] = useState(false)

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

  useEffect(() => {
    if (queryParams.contact_sales) {
      setIsContactSalesModalOpen(true)
    }
  }, [queryParams])

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <header>
        <Navbar />
        <div className={styles.nav}>
          <Container size='large'>
            <nav className={styles.navMain}>
              <div className={styles.navLeft}>
                <Link to='/' className={`${styles.link} ${styles.linkLogo}`} title='Logo'>
                  <img src='/img/company-logos/fpjs.svg' alt='FingerprintJS' className={styles.logo} />
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
                <Button href={URL.signupUrl}>Free Trial</Button>
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

      <Modal
        title='Contact Sales'
        open={isContactSalesModalOpen}
        onClose={() => {
          setIsContactSalesModalOpen(false)

          delete queryParams.contact_sales
          navigate(`${location.pathname}${buildQueryString(queryParams)}`)
        }}
      >
        <ContactSalesForm />
      </Modal>
    </>
  )
}
