'use client'

import { useEffect, useCallback } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

interface NavLink {
  readonly text: string
  readonly href: string
}

interface MobileMenuOverlayProps {
  links: readonly NavLink[]
  onClose: () => void
}

export function MobileMenuOverlay({ links, onClose }: MobileMenuOverlayProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <div
      className="mobile-menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="ナビゲーションメニュー"
    >
      <div className="mobile-menu-backdrop" onClick={onClose} />
      <div className="mobile-menu-panel">
        <div className="mobile-menu-header">
          <button
            type="button"
            aria-label="メニューを閉じる"
            onClick={onClose}
            className="mobile-menu-close-btn"
          >
            <X size={24} color="var(--ryokan-dark)" />
          </button>
        </div>
        <nav className="mobile-menu-nav">
          {links.map(({ text, href }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="mobile-menu-link"
            >
              {text}
            </Link>
          ))}
          <div className="mobile-menu-divider" aria-hidden="true" />
          <Link
            href="/reservation"
            onClick={onClose}
            className="mobile-menu-cta"
          >
            ご予約
          </Link>
        </nav>
      </div>
    </div>
  )
}
