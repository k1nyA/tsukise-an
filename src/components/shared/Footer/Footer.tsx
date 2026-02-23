'use client'

import Link from 'next/link'
import { Instagram, Facebook, MessageCircle } from 'lucide-react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

const PRIMARY_NAV = [
  { text: '客室', href: '/rooms' },
  { text: '温泉', href: '/onsen' },
  { text: 'お料理', href: '/cuisine' },
  { text: '過ごし方', href: '/experience' },
  { text: 'アクセス', href: '/access' },
] as const

const SECONDARY_NAV = [
  { text: 'お知らせ', href: '/news' },
  { text: 'よくあるご質問', href: '/faq' },
  { text: 'お問い合わせ', href: '/contact' },
] as const

const LEGAL_LINKS = [
  { text: 'プライバシーポリシー', href: '/privacy' },
  { text: '特定商取引法に基づく表記', href: '/legal' },
  { text: 'サイトマップ', href: '/sitemap' },
] as const

function FooterBrand({ isMobile }: { isMobile: boolean }) {
  return (
    <div
      className="flex flex-col"
      style={{
        gap: 16,
        alignItems: isMobile ? 'center' : 'flex-start',
      }}
    >
      <Link
        href="/"
        className="flex items-center"
        style={{ gap: 12, textDecoration: 'none' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 24,
            fontWeight: 'bold',
            color: 'var(--ryokan-gold)',
          }}
        >
          月
        </span>
        <span
          style={{ width: 1, height: 24, backgroundColor: 'var(--ryokan-muted)' }}
          aria-hidden="true"
        />
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 18,
            fontWeight: 600,
            color: 'var(--ryokan-text-on-dark)',
            letterSpacing: 3,
          }}
        >
          月瀬庵
        </span>
      </Link>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: isMobile ? 11 : 12,
          fontWeight: 300,
          color: 'var(--ryokan-subtle)',
          letterSpacing: 1,
          margin: 0,
          textAlign: isMobile ? 'center' : 'left',
        }}
      >
        〒250-0522{'\n'}神奈川県足柄下郡箱根町元箱根138
      </p>
    </div>
  )
}

export function Footer() {
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'

  return (
    <footer
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-darkest)',
        padding: 'var(--r-footer-py-top) var(--r-footer-px) var(--r-footer-py-bottom) var(--r-footer-px)',
        gap: 'var(--r-footer-gap)',
      }}
    >
      {/* Top: Brand + Nav */}
      {isMobile ? (
        <div className="flex w-full flex-col items-center" style={{ gap: 32 }}>
          <FooterBrand isMobile={true} />
          <nav
            className="flex flex-wrap items-center justify-center"
            style={{ gap: 'var(--r-footer-nav-gap)' }}
          >
            {PRIMARY_NAV.map(({ text, href }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 300,
                  color: 'var(--ryokan-subtle)',
                  letterSpacing: 2,
                  textDecoration: 'none',
                }}
              >
                {text}
              </Link>
            ))}
          </nav>
          <Link
            href="/reservation"
            className="flex w-full items-center justify-center"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--ryokan-subtle)',
              letterSpacing: 2,
              textDecoration: 'none',
              border: '1px solid var(--ryokan-subtle)',
              padding: '14px 40px',
            }}
          >
            ご予約
          </Link>
        </div>
      ) : (
        <div className="flex w-full justify-between">
          <FooterBrand isMobile={false} />
          <nav
            className="flex items-center"
            style={{ gap: 'var(--r-footer-nav-gap)' }}
          >
            {PRIMARY_NAV.map(({ text, href }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 300,
                  color: 'var(--ryokan-subtle)',
                  letterSpacing: 2,
                  textDecoration: 'none',
                }}
              >
                {text}
              </Link>
            ))}
            <Link
              href="/reservation"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--ryokan-subtle)',
                letterSpacing: 2,
                textDecoration: 'none',
                border: '1px solid var(--ryokan-subtle)',
                padding: '8px 24px',
              }}
            >
              ご予約
            </Link>
          </nav>
        </div>
      )}

      {/* Secondary Nav */}
      <div
        className="flex w-full items-center justify-center"
        style={{ gap: isMobile ? 16 : 24 }}
      >
        {SECONDARY_NAV.map(({ text, href }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              fontWeight: 300,
              color: 'var(--ryokan-subtle)',
              letterSpacing: 1,
              textDecoration: 'none',
            }}
          >
            {text}
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div
        style={{ width: '100%', height: 1, backgroundColor: '#2C241888' }}
        aria-hidden="true"
      />

      {/* Legal + SNS */}
      {isMobile ? (
        <div className="flex w-full flex-col items-center" style={{ gap: 24 }}>
          <div className="flex flex-col items-center" style={{ gap: 8 }}>
            {LEGAL_LINKS.map(({ text, href }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  fontWeight: 300,
                  color: 'var(--ryokan-secondary)',
                  letterSpacing: 1,
                  textDecoration: 'none',
                }}
              >
                {text}
              </Link>
            ))}
          </div>
          <div className="flex items-center" style={{ gap: 24 }}>
            <Instagram size={18} color="var(--ryokan-subtle)" />
            <Facebook size={18} color="var(--ryokan-subtle)" />
            <MessageCircle size={18} color="var(--ryokan-subtle)" />
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center" style={{ gap: 32 }}>
            {LEGAL_LINKS.map(({ text, href }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  fontWeight: 300,
                  color: 'var(--ryokan-secondary)',
                  letterSpacing: 1,
                  textDecoration: 'none',
                }}
              >
                {text}
              </Link>
            ))}
          </div>
          <div className="flex items-center" style={{ gap: 24 }}>
            <Instagram size={18} color="var(--ryokan-subtle)" />
            <Facebook size={18} color="var(--ryokan-subtle)" />
            <MessageCircle size={18} color="var(--ryokan-subtle)" />
          </div>
        </div>
      )}

      {/* Copyright */}
      <p
        style={{
          fontFamily: 'var(--font-accent)',
          fontSize: 11,
          fontWeight: 'normal',
          color: '#6B5D4F55',
          letterSpacing: 2,
          margin: 0,
        }}
      >
        &copy; 2026 月瀬庵 TSUKISE-AN. All Rights Reserved.
      </p>
    </footer>
  )
}
