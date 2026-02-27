import Link from 'next/link'

const links = [
  { label: '空室を確認する', href: '/reservation' },
  { label: '客室を見る', href: '/rooms' },
] as const

export function OnsenLinksSection() {
  return (
    <section
      className="w-full"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
      }}
    >
      <div
        className="r-onsen-links-layout"
        style={{
          padding: 'var(--r-onsen-links-py) var(--r-onsen-links-px)',
          gap: 'var(--r-onsen-links-gap)',
        }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--r-onsen-links-size)',
              fontWeight: 500,
              color: 'var(--ryokan-gold, #8B6914)',
              letterSpacing: 1,
              textDecoration: 'none',
            }}
          >
            {link.label} →
          </Link>
        ))}
      </div>
    </section>
  )
}
