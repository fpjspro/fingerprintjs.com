import React from 'react'
import { ReactComponent as ChevronRightSvg } from '../../img/chevron-right.svg'
import { ReactComponent as ChevronLeftSvg } from '../../img/chevron-left.svg'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import classNames from 'classnames'
import Button from '../common/Button'
import { CurrentVisitProps } from './currentVisitProps'
import { getBotDecision, getBrowserName, getVisitTitle } from '../../helpers/fpjs-widget'
import { ReactComponent as InfoSvg } from './info.svg'
import Tippy from '@tippyjs/react'
import styles from './MobileWidget.module.scss'
import { GATSBY_MAPBOX_ACCESS_TOKEN } from '../../constants/env'

const mapboxToken = GATSBY_MAPBOX_ACCESS_TOKEN

SwiperCore.use([Navigation])

interface MobileWidgetProps extends CurrentVisitProps {
  isLoaded: boolean
  className?: string | string[]
}

export default function MobileWidget({ className, isLoaded, visits, visitorId }: MobileWidgetProps) {
  return (
    <Swiper
      className={classNames(className, styles.container, {
        [styles.loaded]: isLoaded,
      })}
      spaceBetween={10}
      slidesPerView={1}
      width={window.innerWidth - 48}
      centeredSlides={true}
      pagination={{
        dynamicBullets: true,
        el: '.swiper-pagination',
        clickable: true,
      }}
      navigation={{
        nextEl: '.btn-next',
        prevEl: '.btn-prev',
      }}
    >
      {visits &&
        visits.map((visit) => {
          return (
            <SwiperSlide
              key={visit.timestamp}
              className={classNames('swiper-slide', styles.item, { [styles.incognito]: visit.incognito })}
            >
              <header className={styles.header}>
                <Button className={classNames('btn-prev', styles.button, styles.mobileOnly)} variant='clear'>
                  <ChevronLeftSvg />
                </Button>
                <h3 className={styles.title}>
                  {visit.requestId === visits[0].requestId ? 'Current Visit' : getVisitTitle(visit.timestamp)}
                </h3>
                <Button className={classNames('btn-next', styles.button, styles.mobileOnly)} variant='clear'>
                  <ChevronRightSvg />
                </Button>
              </header>
              <div className={styles.visit}>
                <div className={styles.visitId}>
                  <div className={styles.label}>Your ID</div>
                  <div className={styles.value}>
                    {visitorId}{' '}
                    <Tippy content='Every visitor to your website is assigned a unique & permanent identifier.'>
                      <InfoSvg tabIndex={0} />
                    </Tippy>
                  </div>
                </div>
                <div className={styles.bot}>
                  <div className={styles.label}>Headless Browser</div>
                  <div className={styles.value}>
                    {getBotDecision(visit.bot?.probability ?? visit.browserDetails?.botProbability ?? 0)}{' '}
                  </div>
                </div>
                <div className={styles.ip}>
                  <div className={styles.label}>IP</div>
                  <div className={styles.value}>{visit.ip}</div>
                </div>
                <div className={styles.incognito}>
                  <div className={styles.label}>Incognito</div>
                  <div className={styles.value}>
                    {visit.incognito ? 'Yes' : 'No'}{' '}
                    <Tippy content='FingerprintJS Pro analyzes every page view and detects if it was made in incognito mode. Open this page in private mode to see it in action.'>
                      <InfoSvg tabIndex={0} />
                    </Tippy>
                  </div>
                </div>
                <div className={styles.browser}>
                  <div className={styles.label}>Browser</div>
                  <div className={styles.value}>{visit && getBrowserName(visit.browserDetails || visit)}</div>
                </div>
                <div className={styles.location}>
                  <div className={styles.label}>Location</div>
                  <div
                    className={classNames(styles.value, {
                      [styles.unavailable]: visit?.ipLocation?.latitude && visit?.ipLocation?.longitude,
                    })}
                  >
                    {visit && (
                      <img
                        alt='Location map'
                        src={`https://api.mapbox.com/styles/v1/mapbox/${
                          visit.incognito ? 'dark-v10' : 'outdoors-v11'
                        }/static/${visit.ipLocation?.longitude},${
                          visit.ipLocation?.latitude
                        },7.00,0/512x512?access_token=${mapboxToken}`}
                      />
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      <div className='swiper-pagination' />
    </Swiper>
  )
}
