import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
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

    document.addEventListener('mousedown', onWrapperClicked)
    return () => {
      document.removeEventListener('mousedown', onWrapperClicked)
    }
  }, [onClose, wrapperRef])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset'
  }, [open])

  return open
    ? ReactDOM.createPortal(
        <div ref={wrapperRef} className={styles.wrapper}>
          <div className={styles.modal}>
            <CloseSvg onClick={() => onClose()} className={styles.close} />

            <div className={styles.content}>
              {title && <h2 className={styles.title}>{title}</h2>}
              {children}
            </div>
          </div>
        </div>,
        document.body
      )
    : null
}
