'use client'

import './lightbox.css'
import { X } from 'lucide-react';
import { useEffect } from 'react'

export const LightboxModal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="lightbox-backdrop" onClick={handleBackdropClick}>
      <div className="lightbox-content">
        <button className="lightbox-close" onClick={onClose}>
          <X className="close-icon" size={32} />

        </button>



        <div className="lightbox-body">
          {children}
        </div>
      </div>
    </div>
  )
}
