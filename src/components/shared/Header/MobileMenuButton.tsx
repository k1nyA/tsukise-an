'use client'

import { useState, useCallback } from 'react'
import { Menu } from 'lucide-react'
import { MobileMenuOverlay } from './MobileMenuOverlay'

const NAV_LINKS = [
  { text: '客室', href: '/rooms' },
  { text: '温泉', href: '/onsen' },
  { text: 'お料理', href: '/cuisine' },
  { text: '過ごし方', href: '/experience' },
  { text: 'アクセス', href: '/access' },
] as const

export function MobileMenuButton() {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = useCallback(() => setIsOpen(true), [])
  const handleClose = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <button
        type="button"
        aria-label="メニューを開く"
        onClick={handleOpen}
        className="header-mobile-menu-btn"
      >
        <Menu size={24} color="var(--ryokan-dark)" />
      </button>
      {isOpen && (
        <MobileMenuOverlay links={NAV_LINKS} onClose={handleClose} />
      )}
    </>
  )
}
