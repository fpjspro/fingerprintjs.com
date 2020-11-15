import React from 'react';
import {ReactComponent as ToolsSvg} from './tools.svg';
import {ReactComponent as IntegrationsSvg} from './integrations.svg';
import Container from '../common/Container';
import Section from '../common/Section';
import ToolsTextBlock from '../common/ToolsTextBlock';
import CodeWindow from '../common/CodeWindow';
import styles from './ServerApiSection.module.scss';

export default function ServerApiSection() {
  return (
    <Section className={styles.flexibleApi}>
      <Container size="large" className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Server API & Webhooks</h2>
          <div className={styles.tools}>
            <ToolsTextBlock 
              icon={<ToolsSvg/>}
              title={'Server-side visitor history API'} 
              text={`Access suspicious visitor activity, bot probability and geolocation at lightspeed.
              Integrate our API into your server-side business rules or signup process.`}
            />
            <ToolsTextBlock 
              icon={<IntegrationsSvg/>}
              title={'Webhooks for flexible workflows'} 
              text={'Receive instant notifications delivered securely to your backend systems, ideal for building scalable and asynchronous processes.'}
            />
          </div>
        </header>
        <div className={styles.content}>
          <CodeWindow code={`curl https://api.fpjs.io/visitors/:visitId \\
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1...'`}/>
          <CodeWindow 
            code={
`{
  "visitorId": "Ibk1527CUFmcnjLwIs4A9",
  "visits": [
    {
      "incognito": true,
      "botProbability": 0,
      "ip": "61.127.217.15",
      "ipLocation": { ... },
      "browserDetails": { ... }
    }
  ]
}`
            }
            hasControls={false}/>
        </div>
      </Container>
    </Section>
  )
}
