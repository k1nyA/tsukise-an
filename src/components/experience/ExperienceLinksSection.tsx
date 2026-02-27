import Link from 'next/link'

const links = [
  { label: '客室を見る →', href: '/rooms' },
  { label: '温泉を見る →', href: '/onsen' },
]

export function ExperienceLinksSection() {
  return (
    <nav
      className="r-exp-links-layout w-full"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: 'var(--r-exp-links-py) var(--r-exp-links-px)',
      }}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--ryokan-gold-dark, #8B6914)',
            letterSpacing: 1,
            textDecoration: 'none',
          }}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
