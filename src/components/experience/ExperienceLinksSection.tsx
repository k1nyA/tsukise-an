import Link from 'next/link'

const links = [
  { label: '客室を見る →', href: '/rooms' },
  { label: '温泉を見る →', href: '/onsen' },
]

export function ExperienceLinksSection() {
  return (
    <nav
      className="flex w-full items-center justify-center"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: '40px 80px',
        gap: 60,
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
