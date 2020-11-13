import React from 'react';
import styles from './CodeWindow.module.scss';
import classNames from 'classnames';

interface CodeWindowProps {
  code: string;
  language?: string;
  hasLineNumbers?: boolean;
  hasControls?: boolean;
}

export default function CodeWindow({
  code,
  language = 'javascript',
  hasLineNumbers = true,
  hasControls = true,
}: CodeWindowProps) {
  return (
    <div className={styles.window}>
      {hasControls && 
        <div className={styles.header}>
          <div className={classNames(styles.button, styles.close)}></div>
          <div className={classNames(styles.button, styles.minimize)}></div>
          <div className={classNames(styles.button, styles.expand)}></div>
        </div>
      }
      <div className={styles.content}>
        <pre>
          <code className={classNames({'line-numbers': hasLineNumbers}, `language-${language}`)}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  )
}
