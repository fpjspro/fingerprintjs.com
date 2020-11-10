import React from 'react';
import ApiResponseCode from '../ApiResponseCode';
import CurlCode from '../CurlCode';
import {ReactComponent as ToolsSvg} from './tools.svg';
import {ReactComponent as IntegrationsSvg} from './integrations.svg';

export default function ServerApiSection() {
  return (
    <section className="section section--flexible-api">
      <div className="container container--large">
          <header className="section-header">
              <h2 className="section__title">Server API & Webhooks</h2>
              <div className="tools-integrations">
                  <div className="tools-integrations-item">
                    <div className="tools-integrations-item__icon-container">
                      <ToolsSvg className="tools-integrations-item__icon"/>
                    </div>
                    <h3 className="tools-integrations-item__title">
                      &gt; Server-side visitor history API
                    </h3>
                    <p className="tools-integrations-item__description">  
                      Access suspicious visitor activity, bot probability and geolocation at lightspeed.
                      Integrate our API into your server-side business rules or signup process.
                    </p>
                  </div>
                  <div className="tools-integrations-item">
                    <div className="tools-integrations-item__icon-container">
                      <IntegrationsSvg className="tools-integrations-item__icon"/>
                    </div>
                    <h3 className="tools-integrations-item__title">
                      &gt; Webhooks for flexible workflows
                    </h3>
                    <p className="tools-integrations-item__description">
                      Receive instant notifications delivered securely to your backend systems, ideal for building scalable and asynchronous processes.
                    </p>
                  </div>
              </div>
          </header>
          <div className="section-content">
              <div className="window">
                  <div className="window-header">
                      <div className="window-header__btn window-header__btn--close"></div>
                      <div className="window-header__btn window-header__btn--minimize"></div>
                      <div className="window-header__btn window-header__btn--expand"></div>
                  </div>
                  <div className="window-content">
                    <CurlCode/>
                  </div>
              </div>
              <div className="window">
                  <div className="window-content">
                    <ApiResponseCode/>
                  </div>
              </div>
          </div>
      </div>
    </section>
  )
}
