'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

const NAV_LINKS = [
  { text: '客室', href: '/rooms' },
  { text: '温泉', href: '/onsen' },
  { text: 'お料理', href: '/cuisine' },
  { text: '過ごし方', href: '/experience' },
  { text: 'アクセス', href: '/access' },
] as const

export function Header() {
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'

  return (
    <header
      className="flex w-full items-center justify-between"
      style={{
        height: 'var(--r-header-height)',
        backgroundColor: 'var(--ryokan-bg)',
        padding: '0 var(--r-header-px)',
      }}
    >
      <Link
        href="/"
        className="flex items-center"
        style={{ gap: isMobile ? 8 : 12, textDecoration: 'none' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: isMobile ? 22 : 28,
            fontWeight: 'bold',
            color: 'var(--ryokan-gold)',
          }}
        >
          月
        </span>
        <span
          style={{
            width: 1,
            height: isMobile ? 28 : 32,
            backgroundColor: 'var(--ryokan-light-gold)',
          }}
          aria-hidden="true"
        />
        <span className="flex flex-col">
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: isMobile ? 16 : 20,
              fontWeight: 600,
              color: 'var(--ryokan-dark)',
              letterSpacing: isMobile ? 2 : 4,
            }}
          >
            月瀬庵
          </span>
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 10,
              fontWeight: 500,
              color: 'var(--ryokan-subtle)',
              letterSpacing: 3,
            }}
          >
            TSUKISE-AN
          </span>
        </span>
      </Link>

      {isMobile ? (
        <button
          type="button"
          aria-label="メニューを開く"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
          }}
        >
          <Menu size={24} color="var(--ryokan-muted)" />
        </button>
      ) : (
        <nav
          className="flex items-center"
          style={{ gap: 'var(--r-nav-gap)' }}
        >
          {NAV_LINKS.map(({ text, href }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--r-nav-size)',
                fontWeight: 'normal',
                color: 'var(--ryokan-muted)',
                letterSpacing: 2,
                textDecoration: 'none',
              }}
            >
              {text}
            </Link>
          ))}
          <span
            style={{
              width: 1,
              height: 20,
              backgroundColor: 'var(--ryokan-light-gold)',
            }}
            aria-hidden="true"
          />
          <Link
            href="/reservation"
            className="inline-flex items-center"
            style={{
              backgroundColor: 'var(--ryokan-gold)',
              borderRadius: 2,
              padding: 'var(--r-nav-cta-py) var(--r-nav-cta-px)',
              border: '1px solid var(--ryokan-gold)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--r-nav-cta-size)',
              fontWeight: 600,
              color: 'var(--ryokan-text-on-dark)',
              letterSpacing: 3,
              textDecoration: 'none',
            }}
          >
            ご予約
          </Link>
        </nav>
      )}
    </header>
  )
}
