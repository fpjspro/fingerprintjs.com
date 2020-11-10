import React, {useState, useEffect} from 'react';
import {Link} from 'gatsby';
import classNames from 'classnames';
import { PaymentType } from '../../types/PaymentType';
import { handlePriceChange } from '../../utils/pricing';

const sliderConfig = {
  min: 0,
  max: 6,
  default: 0,
}

export default function Billing() {
  const [paymentType, setPaymentType] = useState<PaymentType>('monthly');
  const [sliderValue, setSliderValue] = useState(sliderConfig.default);

  const [valueLabel, setValueLabel] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [sliderOffsetCss, setSliderOffsetCss] = useState('');

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSliderValue(newValue);
    recalculatePricing(newValue, paymentType);
  }

  const handlePaymentTypeChange = (type: PaymentType) => (e: React.MouseEvent<HTMLButtonElement>) => {
    setPaymentType(type);
    recalculatePricing(sliderValue, type);
  }

  const recalculatePricing = (sliderValue: number, paymentType: PaymentType) => {
    const {valueLabel, newPrice, leftOffsetCss} = handlePriceChange(sliderConfig.min, sliderConfig.max, sliderValue, paymentType);
    setValueLabel(valueLabel);
    setMonthlyPayment(newPrice);
    setSliderOffsetCss(leftOffsetCss);
  }

  useEffect(() => {
    recalculatePricing(sliderValue, paymentType);
  }, []);

  return (
    <section className='section section--billing'>
      <div className='container container--large'>
        <header className='section-header'>
          <h2 className='section__title'>
            Predictable &amp; Transparent Billing
          </h2>
          <Link to='/pricing' className='btn btn--outlined'>
            Detailed Pricing
          </Link>
        </header>
        <div className='section-content'>
          <div className='identification-per-month'>
            <h3 className='identification-per-month__title'>
              How many identification API calls per month do you need?
            </h3>
            <div className='slider' style={{'--left': sliderOffsetCss} as React.CSSProperties}>
              <span className='slider-output'>
                {valueLabel}
              </span>
              <label htmlFor='billingSlider' className='slider-label'>
                <span className='slider-label__text'>
                  100K
                </span>
                <span className='slider-label__text'>
                  250K
                </span>
                <span className='slider-label__text'>
                  500K
                </span>
                <span className='slider-label__text'>
                  1M
                </span>
                <span className='slider-label__text'>
                  5M
                </span>
                <span className='slider-label__text'>
                  10M
                </span>
                <span className='slider-label__text'>
                  20M
                </span>
              </label>
              <div className='slider-input-container'>
                <input
                  className='slider-input'
                  type='range'
                  min={sliderConfig.min}
                  max={sliderConfig.max}
                  value={sliderValue}
                  name='billing-slider'
                  onChange={handleSliderChange}
                />
              </div>
            </div>
            <p className='identification-per-month__footnote'>
              Our standard plan comes with 1 year visit history and email support. 
              <br />
              <br />
              <a href="mailto:sales@fingerprintjs.com" style={{textDecoration: 'underline'}}>Contact sales</a> 
              for an enterprise license, 99.9% SLA and 24/7 dedicated support.
            </p>
          </div>
          <div className='payment'>
            <div className='payment-per-month'>
              <span className='price'>
                {monthlyPayment}
              </span>
              per month
            </div>
            <div className='billed' id='billed_annual_text'>
              billed yearly
            </div>
            <div className='payment-switcher' data-type='annually'>
              <button
                className={classNames(
                  'payment-switcher__button',
                  'payment-switcher__button--annually', 
                  {'payment-switcher__button--active': paymentType === 'annually'}
                )}
                onClick={handlePaymentTypeChange('annually')}
                data-type='annually'
              >
                Pay Annually
              </button>
              <button
                className={classNames(
                  'payment-switcher__button', 
                  'payment-switcher__button--monthly', 
                  {'payment-switcher__button--active': paymentType === 'monthly'}
                )}
                onClick={handlePaymentTypeChange('monthly')}
                data-type='monthly'
              >
                Pay Monthly
              </button>
            </div>
            <p className='payment__description'>
              With annual pricing you lock in an annual price with a discount by prepaying. This plan is recommended for users with predictable or high traffic volumes.
            </p>
          </div>
        </div>
        <div className='section-link'>
          <a href='#0' className='btn btn--outlined'>
            Detailed Pricing
          </a>
        </div>
      </div>
    </section>
  )
}
