import * as FP from '@fingerprintjs/fingerprintjs-pro'
import React, { useState, useEffect } from 'react'
import { getVisitTitle, getBrowserName, getBotDecision } from '../../utils/fpjs-widget'
import classNames from 'classnames'
import { ReactComponent as InfoSvg } from './info.svg'
import { ReactComponent as IncognitoSvg } from './incognito.svg'
import Tippy from '@tippyjs/react'
import styles from './FpjsWidget.module.scss'

interface VisitorResponse extends FP.FullIpExtendedGetResult {
  timestamp: number
  browserDetails: {
    botProbability: number
    browserName: string
    browserVersion: string
    os: string
    osVersion: string
    device: string
  }
}

export default function FpjsWidget() {
  // const dashboardEndpoint = process.env.GATSBY_FPJS_DASHBOARD_ENDPOINT;
  const clientToken = process.env.GATSBY_FPJS_TOKEN
  const apiToken = process.env.GATSBY_FPJS_API_TOKEN
  const endpoint = process.env.GATSBY_FPJS_ENDPOINT
  const region = process.env.GATSBY_FPJS_REGION as FP.Region
  const config: FP.GetOptions<true, 'full'> = {
    ipResolution: 'full',
    extendedResult: true,
    timeout: 30_000,
  }

  const [currentVisit, setCurrentVisit] = useState<VisitorResponse>()
  const [visits, setVisits] = useState<VisitorResponse[]>([])
  const [visitorId, setVisitorId] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    FP.load({ token: clientToken!, endpoint, region })
      .then((fp) => fp.get(config))
      .then(({ visitorId }) => {
        setVisitorId(visitorId)
        return loadFpjsHistory(endpoint, visitorId, apiToken)
      })
      .then((data) => {
        setVisits(data.visits)
        setCurrentVisit(data.visits[0])
      })
      .catch((e) => {
        console.error(`Fingerprint loading failed: ${e.message}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <div
          className={classNames(styles.demo, {
            [styles.loaded]: !isLoading,
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
          <div className={styles.currentVisit}>
            <div className={styles.header}>
              {currentVisit &&
                (currentVisit.requestId === visits[0].requestId
                  ? 'Your Current Visit'
                  : getVisitTitle(currentVisit.timestamp))}
            </div>
            <div className={styles.content}>
              <div className={styles.visitId}>
                <span className={styles.label}>Your ID:</span>
                <span className={styles.value}>{visitorId}</span>
                <Tippy content='Every visitor to your website is assigned a unique & permanent identifier.'>
                  <InfoSvg tabIndex={0} />
                </Tippy>
              </div>
              <div className={classNames(styles.info, styles.bot)}>
                <span className={styles.label}>Bot</span>
                <span className={styles.value}>
                  {getBotDecision(currentVisit?.bot?.probability ?? currentVisit?.browserDetails?.botProbability ?? 0)}
                </span>
                <Tippy content='Every response will include the botProbability field that you can use to identify bot traffic.'>
                  <InfoSvg tabIndex={0} />
                </Tippy>
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
                <div className={styles.value}>
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
          </div>
        </div>
      )}
    </>
  )
}

function loadFpjsHistory(endpoint, visitorId, apiToken) {
  return fetch(`${endpoint}/visitors/${visitorId}?token=${apiToken}&limit=20`).then((response) => response.json())
}
