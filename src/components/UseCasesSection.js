import React from 'react';
import {ReactComponent as AccountFraudSvg} from '../img/account_fraud.svg';
import {ReactComponent as PaymentProcessingSvg} from '../img/payment_processing.svg';

export default function UseCasesSection({blurbs}) {
  return (
    <section className='section section--use-cases'>
      <div className='container'>
        <header className='section-header'>
          <h2 className='section__title'>
            FingerprintJS
            <br />
            <strong>
              Use Cases
            </strong>
          </h2>
        </header>
        <div className='section-content'>
          <div className='use-cases'>
            {blurbs.map(blurbs => {
              return (
                <div className='use-case use-case--large'>
                  <div className='use-case__icon-container'>
                    <AccountFraudSvg className="use-case__icon"/>
                  </div>
                  <div className='use-case-info'>
                    <h3 className='use-case__title'>
                      {blurbs.title}
                    </h3>
                    <p className='use-case__description'>
                      {blurbs.text}
                    </p>
                  </div>
                </div>
              )
            })
            }
            {/* <div className='use-case use-case--large'>
              <div className='use-case__icon-container'>
                <AccountFraudSvg className="use-case__icon"/>
              </div>
              <div className='use-case-info'>
                <h3 className='use-case__title'>
                  Account Fraud
                </h3>
                <p className='use-case__description'>
                  Confirm that every visitor on your website is real and not an advanced bot using multiple techniques to create fake accounts.
                  <br/><br/>
                  You can mitigate account takeover attempts, prevent password sharing and significantly reduce the number of fake accounts.
                </p>
              </div>
            </div>
            <div className='use-case use-case--large'>
              <div className='use-case__icon-container'>
                <PaymentProcessingSvg className="use-case__icon"/>
              </div>
              <div className='use-case-info'>
                <h3 className='use-case__title'>
                  Payment Processing
                </h3>
                <p className='use-case__description'>
                  Identify anonymous visitors behind every transaction. Instantly recognize repeated card testing activity and link it to
                  specific users. <br/><br/>Significantly reduce chargebacks and fraudulent payments just one month after integrating FingerprintJS
                  on your website.
                </p>
              </div>
            </div>
            <div className='use-case'>
              <div className='use-case__icon-container'>
                <svg className='use-case__icon'>
                  <use xlinkHref='#commerce'></use>
                </svg>
              </div>
              <div className='use-case-info'>
                <h3 className='use-case__title'>
                  E-Commerce
                </h3>
                <p className='use-case__description'>
                  Every fraudulent order is money directly out of your pocket. With our best in class tools you can stop malicious users before they cost you real money.
                </p>
              </div>
            </div>
            <div className='use-case'>
              <div className='use-case__icon-container'>
                <svg className='use-case__icon'>
                  <use xlinkHref='#cryptocurrency'></use>
                </svg>
              </div>
              <div className='use-case-info'>
                <h3 className='use-case__title'>
                  Cryptocurrency
                </h3>
                <p className='use-case__description'>
                  Ensure that your trading, exchange and transfer operations are
                                safe from malicious activity or account fraud.
                </p>
              </div>
            </div>
            <div className='use-case'>
              <div className='use-case__icon-container'>
                <svg className='use-case__icon'>
                  <use xlinkHref='#gaming'></use>
                </svg>
              </div>
              <div className='use-case-info'>
                <h3 className='use-case__title'>
                  Gaming
                </h3>
                <p className='use-case__description'>
                  Catch users trying to break your system via multiple accounts, devices, and IP addresses to unjustly enrich themselves.
                </p>
              </div>
            </div>
            <div className='use-case'>
              <div className='use-case__icon-container'>
                <svg className='use-case__icon'>
                  <use xlinkHref='#custom_solution'></use>
                </svg>
              </div>
              <div className='use-case-info'>
                <h3 className='use-case__title'>
                  Custom Solution
                </h3>
                <p className='use-case__description'>
                  We can build a custom solution that works for your industry.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
