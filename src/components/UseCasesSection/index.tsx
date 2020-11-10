import React, { useEffect } from 'react';
import {ReactComponent as AccountFraudSvg} from './account_fraud.svg';

export default function UseCasesSection({blurbs}) {
  // useEffect(() => {
  //   const importIcon = async () => {
  //     try {
  //       const { default: namedImport } = await import(`../img/${blurbs[0].image}.svg`);
  //       console.log(namedImport);
  //     } catch (err) {
  //       throw err;
  //     }
  //   };
  //   importIcon();
  // }, [])

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
            {blurbs.map((blurb, i) => {
              return (
                <div key={`use-case_${i}_${blurb.title}`} className='use-case use-case--large'>
                  <div className='use-case__icon-container'>
                    <AccountFraudSvg className="use-case__icon"/>
                  </div>
                  <div className='use-case-info'>
                    <h3 className='use-case__title'>
                      {blurb.title}
                    </h3>
                    <p className='use-case__description'>
                      {blurb.text}
                    </p>
                  </div>
                </div>
              )
            })
            }
          </div>
        </div>
      </div>
    </section>
  )
}
