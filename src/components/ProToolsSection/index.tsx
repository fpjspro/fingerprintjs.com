import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'

import { ReactComponent as BrowserFingerprintingSvg } from '../../img/browser_fingerprinting.svg'
import { ReactComponent as GeolocationSvg } from '../../img/geolocation.svg'
import { ReactComponent as AnonymousUserIdentificationSvg } from '../../img/anonymous_user_identification.svg'
import { ReactComponent as IncognitoDetectionSvg } from '../../img/incognito_detection.svg'
import { ReactComponent as ApiWebhooksSvg } from '../../img/api_webhooks.svg'
import { ReactComponent as IntegrationsSvg } from '../../img/integrations.svg'
import Container from '../common/Container'
import Section from '../common/Section'
import styles from './ProTools.module.scss'

SwiperCore.use([Pagination])

export default function ProToolsSection() {
  return (
    <Section className={styles.proTools}>
      <Container className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.sectionTitle}>
            FingerprintJS
            <br />
            <strong>Pro Tools</strong>
          </h2>
        </header>

        <div className={styles.content} id='swiper--pro-tools'>
          <Swiper
            breakpoints={{
              320: {
                slidesPerView: 1,
                slidesPerColumn: 1,
                spaceBetween: 0,
                pagination: {
                  el: '.swiper-pagination',
                  clickable: true,
                },
              },
              768: {
                slidesPerView: 2,
                slidesPerColumn: 3,
                slidesPerColumnFill: 'row',
                spaceBetween: 28,
              },
              1024: {
                slidesPerView: 3,
                slidesPerColumn: 2,
                spaceBetween: 28,
                slidesPerColumnFill: 'row',
              },
            }}
          >
            <div className='swiper-wrapper'>
              <SwiperSlide className={`swiper-slide ${styles.item}`}>
                <BrowserFingerprintingSvg className={styles.icon} />
                <h3 className={styles.title}>Browser Fingerprinting</h3>
                <p className={styles.description}>
                  Our fingerprinting approach is the most advanced in the market and employs many cutting-edge methods
                  of browser identification.
                </p>
                {/* <a href='#0' className='pro-tools-item__link'>
                  Learn More
                </a> */}
              </SwiperSlide>
              <SwiperSlide className={`swiper-slide ${styles.item}`}>
                <GeolocationSvg className={styles.icon} />
                <h3 className={styles.title}>Geolocation</h3>
                <p className={styles.description}>
                  Every identification API request will provide the geolocation of the current visitor, including
                  geoposition, city, country, timezone and ISP information.
                </p>
              </SwiperSlide>
              <SwiperSlide className={`swiper-slide ${styles.item}`}>
                <AnonymousUserIdentificationSvg className={styles.icon} />
                <h3 className={styles.title}>Anonymous User Identification</h3>
                <p className={styles.description}>
                  Every visitor to your website is assigned a permanent visitorID that can be used to identify visitors
                  trying to change their identity via proxies or other techniques.
                </p>
              </SwiperSlide>
              <SwiperSlide className={`swiper-slide ${styles.item}`}>
                <IncognitoDetectionSvg className={styles.icon} />
                <h3 className={styles.title}>Incognito Mode Detection</h3>
                <p className={styles.description}>
                  FingerprintJS Pro tracks whether visitors are using incognito mode, and can accurately identify users
                  across incognito browsing sessions.
                </p>
              </SwiperSlide>
              <SwiperSlide className={`swiper-slide ${styles.item}`}>
                <ApiWebhooksSvg className={styles.icon} />
                <h3 className={styles.title}>API & Webhooks</h3>
                <p className={styles.description}>
                  Get user activity history, suspicious activity and geolocation. With webhooks you can receive instant
                  notifications that are delivered securely to your backend systems.
                </p>
              </SwiperSlide>
              <SwiperSlide className={`swiper-slide ${styles.item}`}>
                <IntegrationsSvg className={styles.icon} />
                <h3 className={styles.title}>Machine Learning</h3>
                <p className={styles.description}>
                  In addition to browser fingerprinting, FingerprintJS Pro's server-side API processes and analyzes vast
                  amounts of data, searching for patterns and re-occurrences of fraudulent activity.
                </p>
              </SwiperSlide>
            </div>
            <div className='swiper-pagination' />
          </Swiper>
        </div>
      </Container>
    </Section>
  )
}
