import React, { useState, useEffect, memo } from 'react'
import { getVisitTitle, getBrowserName, getBotDecision } from '../../helpers/fpjs-widget'
import { ReactComponent as InfoSvg } from './info.svg'
import { ReactComponent as IncognitoSvg } from './incognito.svg'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { VisitorResponse } from './visitorResponse'
import { CurrentVisitProps } from './currentVisitProps'
import MobileWidget from './MobileWidget'
import { useVisitorData } from '../../context/FpjsContext'
import useRollbar from '../../hooks/useRollbar'
import { GATSBY_FPJS_API_TOKEN, GATSBY_FPJS_ENDPOINT, GATSBY_MAPBOX_ACCESS_TOKEN } from '../../constants/env'
import styles from './FpjsWidget.module.scss'

const apiToken = GATSBY_FPJS_API_TOKEN ?? 'test_fpjs_api_token'
const endpoint = GATSBY_FPJS_ENDPOINT ?? ''
const mapboxToken = GATSBY_MAPBOX_ACCESS_TOKEN

export default memo(function FpjsWidget() {
  const [currentVisit, setCurrentVisit] = useState<VisitorResponse>()
  const [visits, setVisits] = useState<VisitorResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  const { visitorData } = useVisitorData()
  const visitorId = visitorData?.visitorId
  const rollbar = useRollbar()

  useEffect(() => {
    let isCancelled = false
    setIsLoading(true)

    async function fetchVisits() {
      if (!visitorId) {
        return
      }
      try {
        const { visits } = await loadFpjsHistory(endpoint, visitorId, apiToken)

        if (!isCancelled) {
          setIsLoaded(true)
          setVisits(visits)
          setCurrentVisit(visits[0])
        }
      } catch (e) {
        rollbar.error('Unable to initialize FingerprintJS Pro', e)
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }
    fetchVisits()

    return () => {
      isCancelled = true
    }
  }, [visitorId, rollbar])

  return (
    <div className={styles.container}>
      {isLoading && <div className={styles.loader} />}
      <div
        className={classNames(styles.demo, styles.desktopOnly, {
          [styles.loaded]: isLoaded,
          [styles.incognito]: currentVisit?.incognito,
        })}
      >
        <div className={styles.history}>
          <div className={styles.header}>
            Visit History
            <Tippy content='FingerprintJS Pro allows you to get a history of visits with all available information'>
              <InfoSvg tabIndex={0} />
            </Tippy>
          </div>
          <div className={styles.content}>
            <ul className={styles.visits}>
              {visits &&
                visits.map(({ requestId, timestamp, incognito }, i) => {
                  return (
                    <li
                      className={classNames(
                        styles.visit,
                        { [styles.selected]: currentVisit?.requestId === requestId },
                        { [styles.incognito]: incognito },
                        { [styles.now]: i === 0 }
                      )}
                      id={`visit_${requestId}`}
                      key={requestId}
                      onClick={() => setCurrentVisit(visits[i])}
                    >
                      {i === 0 ? 'Current visit' : getVisitTitle(timestamp)}
                      {incognito && <IncognitoSvg />}
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
        {visitorId && <CurrentVisit currentVisit={currentVisit} visits={visits} visitorId={visitorId} />}
      </div>
      {!isLoading && visitorId && (
        <MobileWidget isLoaded={isLoaded} visitorId={visitorId} visits={visits} currentVisit={currentVisit} />
      )}
    </div>
  )
})

function CurrentVisit({ currentVisit, visits, visitorId }: CurrentVisitProps) {
  return (
    <div className={styles.currentVisit}>
      <div className={styles.header}>
        <div className={styles.title}>
          {currentVisit &&
            (currentVisit.requestId === visits[0].requestId
              ? 'Your Current Visit'
              : getVisitTitle(currentVisit.timestamp))}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.visitId}>
          <span className={styles.label}>Your ID: </span>
          <span className={styles.value}>{visitorId}</span>
          <Tippy content='Every visitor to your website is assigned a unique & permanent identifier.'>
            <InfoSvg tabIndex={0} />
          </Tippy>
        </div>
        <div className={classNames(styles.info, styles.bot)}>
          <span className={styles.label}>Headless Browser</span>
          <span className={styles.value}>
            {getBotDecision(currentVisit?.bot?.probability ?? currentVisit?.browserDetails?.botProbability ?? 0)}
          </span>
        </div>
        <div className={classNames(styles.info, styles.ip)}>
          <span className={styles.label}>IP</span>
          <span className={styles.value}>{currentVisit?.ip}</span>
        </div>
        <div className={classNames(styles.info, styles.incognito)}>
          <span className={styles.label}>Incognito</span>
          <span className={styles.value}>{currentVisit?.incognito ? 'Yes' : 'No'}</span>
          <Tippy content='FingerprintJS Pro analyzes every page view and detects if it was made in incognito mode. Open this page in private mode to see it in action.'>
            <InfoSvg tabIndex={0} />
          </Tippy>
        </div>
        <div className={classNames(styles.info, styles.browser)}>
          <span className={styles.label}>Browser</span>
          <span className={styles.value}>
            {currentVisit && getBrowserName(currentVisit?.browserDetails || currentVisit)}
          </span>
        </div>
        <div className={classNames(styles.info, styles.location)}>
          <span className={styles.label}>
            Location
            <Tippy content='Based on the visit IP address'>
              <InfoSvg style={{ marginLeft: '10px' }} tabIndex={0} />
            </Tippy>
          </span>
          <div
            className={classNames(styles.value, {
              [styles.unavailable]: currentVisit?.ipLocation?.latitude && currentVisit?.ipLocation?.longitude,
            })}
          >
            {currentVisit && (
              <img
                alt='Location map'
                src={`https://api.mapbox.com/styles/v1/mapbox/${
                  currentVisit?.incognito ? 'dark-v10' : 'outdoors-v11'
                }/static/${currentVisit?.ipLocation?.longitude},${
                  currentVisit?.ipLocation?.latitude
                },7.00,0/512x512?access_token=${mapboxToken}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

async function loadFpjsHistory(endpoint: string, visitorId: string, apiToken: string) {
  const response = await fetch(`${endpoint}visitors/${visitorId}?token=${apiToken}&limit=20`)
  return await response.json()
}
