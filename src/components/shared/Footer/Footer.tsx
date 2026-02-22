import Link from 'next/link'

const PRIMARY_NAV_LINKS = [
  { text: '客室', href: '/rooms' },
  { text: '温泉', href: '/onsen' },
  { text: 'お料理', href: '/cuisine' },
  { text: '過ごし方', href: '/experience' },
  { text: 'アクセス', href: '/access' },
  { text: 'ご予約', href: '/reservation' },
] as const

const SECONDARY_NAV_LINKS = [
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
      style={{
        width: '100%',
        backgroundColor: 'var(--ryokan-darkest)',
        padding: '60px 80px 32px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 48,
      }}
    >
      {/* Top Section: Brand + Primary Nav */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {/* Logo Row */}
          <Link
            href="/"
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              textDecoration: 'none',
            }}
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
              style={{
                width: 1,
                height: 24,
                backgroundColor: 'var(--ryokan-muted)',
              }}
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

          {/* Address */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              fontWeight: 300,
              color: 'var(--ryokan-subtle)',
              letterSpacing: 1,
              margin: 0,
            }}
          >
            〒250-0522 神奈川県足柄下郡箱根町元箱根138
          </p>
        </div>

        {/* Primary Nav */}
        <nav
          aria-label="フッターナビゲーション"
          style={{
            display: 'flex',
            gap: 40,
            alignItems: 'flex-start',
          }}
        >
          {PRIMARY_NAV_LINKS.map(({ text, href }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                fontWeight: 300,
                color: text === 'ご予約' ? 'var(--ryokan-gold)' : 'var(--ryokan-subtle)',
                letterSpacing: 2,
                textDecoration: 'none',
              }}
            >
              {text}
            </Link>
          ))}
        </nav>
      </div>

      {/* Secondary Nav */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {SECONDARY_NAV_LINKS.map(({ text, href }) => (
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
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#2C241888',
        }}
        aria-hidden="true"
      />

      {/* Middle Section: Legal + SNS */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Legal Links */}
        <div
          style={{
            display: 'flex',
            gap: 32,
            alignItems: 'center',
          }}
        >
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

        {/* SNS Icons (placeholder) */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            alignItems: 'center',
          }}
          aria-label="SNS"
        >
          <span aria-label="Instagram" style={{ color: 'var(--ryokan-subtle)', fontSize: 18 }}>
            {/* Instagram icon placeholder */}
          </span>
          <span aria-label="Facebook" style={{ color: 'var(--ryokan-subtle)', fontSize: 18 }}>
            {/* Facebook icon placeholder */}
          </span>
          <span aria-label="LINE" style={{ color: 'var(--ryokan-subtle)', fontSize: 18 }}>
            {/* LINE icon placeholder */}
          </span>
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
