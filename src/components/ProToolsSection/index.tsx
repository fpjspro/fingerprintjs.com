import React from 'react';
import {ReactComponent as BrowserFingerprintingSvg} from './browser_fingerprinting.svg';
import {ReactComponent as GeolocationSvg} from './geolocation.svg';
import {ReactComponent as BotDetectionSvg} from './bot_detection.svg';
import {ReactComponent as AnonymousUserIdentificationSvg} from './anonymous_user_identification.svg';
import {ReactComponent as IncognitoDetectionSvg} from './incognito_detection.svg';
import {ReactComponent as ApiWebhooksSvg} from './api_webhooks.svg';

export default function ProToolsSection() {
  return (
    <section className='section section--pro-tools'>
      <div className='container'>
        <header className='section-header'>
          <h2 className='section__title'>
            FingerprintJS
            <br />
            <strong>
              Pro Tools
            </strong>
          </h2>
        </header>
        <div className='section-content swiper-container' id='swiper--pro-tools'>
          <div className='swiper-wrapper'>
            <div className='swiper-slide pro-tools-item'>
              <BrowserFingerprintingSvg className='pro-tools-item__icon'/>
              <h3 className='pro-tools-item__title'>
                Browser Fingerprinting
              </h3>
              <p className='pro-tools-item__description'>
                Our fingerprinting approach is the most advanced in the market and employs many cutting-edge methods of browser identification.
              </p>
              {/* <a href='#0' className='pro-tools-item__link'>
                Learn More
              </a> */}
            </div>
            <div className='swiper-slide pro-tools-item'>
              <GeolocationSvg className='pro-tools-item__icon'/>
              <h3 className='pro-tools-item__title'>
                Geolocation
              </h3>
              <p className='pro-tools-item__description'>
                Every identification API request will provide the geolocation of the current visitor, including geoposition, city, country, timezone and ISP information.
              </p>
            </div>
            <div className='swiper-slide pro-tools-item'>
              <BotDetectionSvg className='pro-tools-item__icon'/>
              <h3 className='pro-tools-item__title'>
                Bot Detection
              </h3>
              <p className='pro-tools-item__description'>
                Our bot probability value will tell you the likelihood of a current visitor being a programmed headless agent to help identify bot traffic on your site.
              </p>
            </div>
            <div className='swiper-slide pro-tools-item'>
              <AnonymousUserIdentificationSvg className='pro-tools-item__icon'/>
              <h3 className='pro-tools-item__title'>
                Anonymous User Identification
              </h3>
              <p className='pro-tools-item__description'>
                Every visitor to your website is assigned a permanent visitorID that can be used to identify visitors trying to change their identity via proxies or other techniques.
              </p>
            </div>
            <div className='swiper-slide pro-tools-item'>
              <IncognitoDetectionSvg className='pro-tools-item__icon'/>
              <h3 className='pro-tools-item__title'>
                Incognito Mode Detection
              </h3>
              <p className='pro-tools-item__description'>
                FingerprintJS Pro tracks whether visitors are using incognito mode, and can accurately identify users across incognito browsing sessions.
              </p>
            </div>
            <div className='swiper-slide pro-tools-item'>
              <ApiWebhooksSvg className='pro-tools-item__icon'/>
              <h3 className='pro-tools-item__title'>
                API & Webhooks
              </h3>
              <p className='pro-tools-item__description'>
                In addition to browser fingerprinting, FingerprintJS Pro's server-side API processes and analyzes vast amounts of data, searching for patterns and re-occurrences of fraudulent activity.
              </p>
            </div>
          </div>
          {/* Add Pagination */}
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  )
}
