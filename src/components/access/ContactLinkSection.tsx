import Link from 'next/link'

export function ContactLinkSection() {
  return (
    <section
      className="flex w-full items-center justify-center"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: 'var(--r-access-contact-py) var(--r-access-contact-px)',
      }}
    >
      <Link
        href="/contact"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          fontWeight: 500,
          color: 'var(--ryokan-gold, #8B6914)',
          letterSpacing: 2,
          textDecoration: 'none',
          textAlign: 'center',
        }}
      >
        お問い合わせ →
      </Link>
    </section>
  )
}
