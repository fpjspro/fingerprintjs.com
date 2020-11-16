import * as FP from '@fingerprintjs/fingerprintjs-pro'
import React, { useState, useEffect } from 'react'
import { getVisitTitle, getBrowserName, getBotDecision } from '../../utils/fpjs-widget'
import classNames from 'classnames'
import { ReactComponent as InfoSvg } from './info.svg'

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

  useEffect(() => {
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
  }, [])

  return (
    <>
      <div className='fingerprint-live-demo-loader' id='fpjs_loader'></div>
      <div className='fingerprint-live-demo' id='fpjs_container'>
        <div className='fingerprint-live-demo-history'>
          <div className='fingerprint-live-demo__header'>
            Visit History
            <InfoSvg
              className='info'
              data-tippy-content='FingerprintJS Pro allows you to get a history of visits with all available information'
              tabIndex={0}
            />
          </div>
          <div className='history'>
            <ul className='history-visits'>
              {visits &&
                visits.map(({ requestId, timestamp }, i) => {
                  return (
                    <li
                      className={classNames('history-visits__visit', {
                        'history-visits__visit--selected': currentVisit?.requestId === requestId,
                      })}
                      id={`visit_${requestId}`}
                      key={requestId}
                      onClick={() => setCurrentVisit(visits[i])}
                    >
                      {i === 0 ? 'Current visit' : getVisitTitle(timestamp)}
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
        <div className='fingerprint-live-demo-current-visit'>
          <div className='fingerprint-live-demo__header' id='fpjs_visit_title'></div>
          <div className='current-visit'>
            <div className='current-visit__id'>
              <span className='current-visit__label'>Your ID:</span>
              <span className='user-id'>{visitorId}</span>
              <InfoSvg
                className='info'
                data-tippy-content='Every visitor to your website is assigned a unique & permanent identifier.'
                tabIndex={0}
              />
            </div>
            <div className='current-visit__bot'>
              <span className='current-visit__label'>Bot</span>
              <span className='user-bot'>
                {getBotDecision(currentVisit?.bot?.probability ?? currentVisit?.browserDetails?.botProbability ?? 0)}
              </span>
              <InfoSvg
                className='info'
                data-tippy-content='Every response will include the botProbability field that you can use to identify bot traffic.'
                tabIndex={0}
              />
            </div>
            <div className='current-visit__ip'>
              <span className='current-visit__label'>IP</span>
              <span className='user-ip'>{currentVisit?.ip}</span>
            </div>
            <div className='current-visit__incognito'>
              <span className='current-visit__label'>Incognito</span>
              <span className='user-incognito'>{currentVisit?.incognito ? 'Yes' : 'No'}</span>
              <InfoSvg
                className='info'
                data-tippy-content='FingerprintJS Pro analyzes every page view and detects if it was made in incognito mode. Open this page in private mode to see it in action.'
                tabIndex={0}
              />
            </div>
            <div className='current-visit__browser'>
              <span className='current-visit__label'>Browser</span>
              <span className='user-browser'>
                {currentVisit && getBrowserName(currentVisit?.browserDetails || currentVisit)}
              </span>
            </div>
            <div className='current-visit__location'>
              <span className='current-visit__label'>
                Location
                <InfoSvg
                  className='info'
                  style={{ marginLeft: '10px' }}
                  data-tippy-content='Based on the visit IP address'
                  tabIndex={0}
                />
              </span>
              <div className='user-location' id='fpjs_location'>
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
    </>
  )
}

function loadFpjsHistory(endpoint, visitorId, apiToken) {
  return fetch(`${endpoint}/visitors/${visitorId}?token=${apiToken}&limit=20`).then((response) => response.json())
}
