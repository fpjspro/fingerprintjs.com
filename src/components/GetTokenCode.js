import React from 'react';

export default function GetTokenCode() {
  return (
    <pre>
      <code className='line-numbers language-javascript'>
        {`
        import FP from '@fingerprintjs/fingerprintjs-pro';
        FP.load({ token })
          .then(fp => fp.get({ extendedResult: true }))
          .then(res => {
            console.log(res.visitorId);
            console.log(res.incognito);
            console.log(res.bot && res.bot.probability);
          });
        `}
      </code>
    </pre>
  )
}
