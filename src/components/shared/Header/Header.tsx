import Link from 'next/link'

const NAV_LINKS = [
  { text: '客室', href: '/rooms' },
  { text: '温泉', href: '/onsen' },
  { text: 'お料理', href: '/cuisine' },
  { text: '過ごし方', href: '/experience' },
  { text: 'アクセス', href: '/access' },
] as const

export function Header() {
  return (
    <header
      className="flex w-full items-center justify-between"
      style={{
        height: 80,
        backgroundColor: 'var(--ryokan-bg)',
        padding: '0 60px',
      }}
    >
      <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 28,
            fontWeight: 'bold',
            color: 'var(--ryokan-gold)',
          }}
        >
          月
        </span>
        <span
          style={{ width: 1, height: 32, backgroundColor: 'var(--ryokan-light-gold)' }}
          aria-hidden="true"
        />
        <span className="flex flex-col">
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 20,
              fontWeight: 600,
              color: 'var(--ryokan-dark)',
              letterSpacing: 4,
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

      <nav className="flex items-center" style={{ gap: 32 }}>
        {NAV_LINKS.map(({ text, href }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
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
          style={{ width: 1, height: 20, backgroundColor: 'var(--ryokan-light-gold)' }}
          aria-hidden="true"
        />
        <Link
          href="/reservation"
          className="inline-flex items-center"
          style={{
            backgroundColor: 'var(--ryokan-gold)',
            borderRadius: 2,
            padding: '14px 44px',
            border: '1px solid var(--ryokan-gold)',
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--ryokan-text-on-dark)',
            letterSpacing: 3,
            textDecoration: 'none',
          }}
        >
          ご予約
        </Link>
      </nav>
    </header>
  )
}
