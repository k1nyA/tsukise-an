import Link from 'next/link'
import { Instagram, Facebook, MessageCircle } from 'lucide-react'

const PRIMARY_NAV = [
  { text: '客室', href: '/rooms' },
  { text: '温泉', href: '/onsen' },
  { text: 'お料理', href: '/cuisine' },
  { text: '過ごし方', href: '/experience' },
  { text: 'アクセス', href: '/access' },
  { text: 'ご予約', href: '/reservation', highlight: true },
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

export function Footer() {
  return (
    <footer
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-darkest)',
        padding: '60px 80px 32px 80px',
        gap: 48,
      }}
    >
      {/* Top: Brand + Nav */}
      <div className="flex w-full justify-between">
        <div className="flex flex-col" style={{ gap: 16 }}>
          <Link href="/" className="flex items-center" style={{ gap: 12, textDecoration: 'none' }}>
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
              fontSize: 14,
              fontWeight: 300,
              color: 'var(--ryokan-subtle)',
              letterSpacing: 1,
              margin: 0,
            }}
          >
            〒250-0522 神奈川県足柄下郡箱根町元箱根138
          </p>
        </div>

        <nav className="flex items-center" style={{ gap: 40 }}>
          {PRIMARY_NAV.map(({ text, href, ...rest }) =>
            'highlight' in rest ? (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--ryokan-subtle)',
                  letterSpacing: 2,
                  textDecoration: 'none',
                  border: '1px solid var(--ryokan-subtle)',
                  padding: '8px 24px',
                }}
              >
                {text}
              </Link>
            ) : (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 300,
                  color: 'var(--ryokan-subtle)',
                  letterSpacing: 2,
                  textDecoration: 'none',
                }}
              >
                {text}
              </Link>
            )
          )}
        </nav>
      </div>

      {/* Secondary Nav */}
      <div className="flex w-full items-center justify-center" style={{ gap: 24 }}>
        {SECONDARY_NAV.map(({ text, href }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
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
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center" style={{ gap: 32 }}>
          {LEGAL_LINKS.map(({ text, href }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
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
