import React, { useEffect, useRef } from 'react'
import { isBrowser } from '../../../utils/detector'
import { ReactComponent as CloseSvg } from '../../../img/close.svg'
import styles from './Modal.module.scss'

interface ModalProps {
  title?: string
  open: boolean
  children: React.ReactNode
  onClose: () => void
}
export default function Modal({ title, open, children, onClose }: ModalProps) {
  const wrapperRef = useRef(null)
  useEffect(() => {
    function onWrapperClicked(event) {
      if (wrapperRef.current && wrapperRef.current === event.target) {
        onClose()
      }
    }

    if (isBrowser()) {
      document.addEventListener('mousedown', onWrapperClicked)
      return () => {
        document.removeEventListener('mousedown', onWrapperClicked)
      }
    }
  }, [onClose, wrapperRef])

  return open ? (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.modal}>
        <header className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <CloseSvg onClick={() => onClose()} className={styles.close} />
        </header>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  ) : null
}
