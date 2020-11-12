import React from 'react';

export default function CurlCode() {
  return (
    <pre>
      <code className='line-numbers language-javascript'>
        {
`curl https://api.fpjs.io/visitors/:visitId \\
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1...'`
        }
      </code>
    </pre>
  )
}
