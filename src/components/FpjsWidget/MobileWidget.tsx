import React from 'react'
import { ReactComponent as ChevronRightSvg } from '../../img/chevron-right.svg'
import { ReactComponent as ChevronLeftSvg } from '../../img/chevron-left.svg'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import classNames from 'classnames'
import styles from './MobileWidget.module.scss'
import Button from '../common/Button'
import { CurrentVisitProps } from './currentVisitProps'
import { getBotDecision, getBrowserName, getVisitTitle } from '../../utils/fpjs-widget'
import { ReactComponent as InfoSvg } from './info.svg'
import Tippy from '@tippyjs/react'

SwiperCore.use([Navigation])

interface MobileWidgetProps extends CurrentVisitProps {
  isLoaded: boolean
  className?: string | string[]
}

export default function MobileWidget({ className, isLoaded, currentVisit, visits, visitorId }: MobileWidgetProps) {
  return (
    <Swiper
      className={classNames(className, styles.container, {
        [styles.loaded]: isLoaded,
        [styles.incognito]: !!currentVisit?.incognito,
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
            <SwiperSlide key={visit.timestamp} className={`swiper-slide ${styles.item}`}>
              <header className={styles.header}>
                <Button className={classNames('btn-prev', styles.button, styles.mobileOnly)} variant='clear'>
                  <ChevronLeftSvg />
                </Button>
                <h3 className={styles.title}>
                  {currentVisit?.requestId === visits[0].requestId
                    ? 'Current Visit'
                    : getVisitTitle(currentVisit?.timestamp)}
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
                  <div className={styles.label}>Bot</div>
                  <div className={styles.value}>
                    {getBotDecision(
                      currentVisit?.bot?.probability ?? currentVisit?.browserDetails?.botProbability ?? 0
                    )}{' '}
                    <Tippy content='Every response will include the botProbability field that you can use to identify bot traffic.'>
                      <InfoSvg tabIndex={0} />
                    </Tippy>
                  </div>
                </div>
                <div className={styles.ip}>
                  <div className={styles.label}>IP</div>
                  <div className={styles.value}>{currentVisit?.ip}</div>
                </div>
                <div className={styles.incognito}>
                  <div className={styles.label}>Incognito</div>
                  <div className={styles.value}>
                    {currentVisit?.incognito ? 'Yes' : 'No'}{' '}
                    <Tippy content='FingerprintJS Pro analyzes every page view and detects if it was made in incognito mode. Open this page in private mode to see it in action.'>
                      <InfoSvg tabIndex={0} />
                    </Tippy>
                  </div>
                </div>
                <div className={styles.browser}>
                  <div className={styles.label}>Browser</div>
                  <div className={styles.value}>
                    {currentVisit && getBrowserName(currentVisit?.browserDetails || currentVisit)}
                  </div>
                </div>
                <div className={styles.location}>
                  <div className={styles.label}>Location</div>
                  <div className={classNames(styles.value, 'user-location')}>
                    {currentVisit && (
                      <img
                        src={`https://api.mapbox.com/styles/v1/mapbox/${
                          currentVisit?.incognito ? 'dark-v10' : 'outdoors-v11'
                        }/static/${currentVisit?.ipLocation?.longitude},${
                          currentVisit?.ipLocation?.latitude
                        },7.00,0/512x512?access_token=pk.eyJ1IjoidmFsZW50aW52YXNpbHlldiIsImEiOiJja2ZvMGttN2UxanJ1MzNtcXp5YzNhbWxuIn0.BjZhTdjY812J3OdfgRiZ4A`}
                      />
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      <div className='swiper-pagination'></div>
    </Swiper>
  )
}
