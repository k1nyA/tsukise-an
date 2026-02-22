import Link from 'next/link'

export function FAQContactSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: '60px 200px',
        gap: 24,
      }}
    >
      <div
        data-testid="faq-contact-box"
        className="flex w-full flex-col items-center"
        style={{
          backgroundColor: 'var(--ryokan-dark, #2C2418)',
          padding: '48px 60px',
          gap: 24,
          borderRadius: 4,
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 20,
            fontWeight: 600,
            color: 'var(--ryokan-text-on-dark, #FAF8F3)',
            letterSpacing: 3,
          }}
        >
          ご質問が見つからない場合は
        </h2>

        <p
          className="text-center"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 300,
            color: 'var(--ryokan-text-subtle, #C4B89A)',
            letterSpacing: 1,
            lineHeight: 2,
          }}
        >
          <span className="block">
            お探しの回答が見つからない場合は、お気軽にお問い合わせくださいませ。
          </span>
          <span className="block">
            お電話またはメールにて、丁寧にお答えいたします。
          </span>
        </p>

        <div className="flex items-center" style={{ gap: 24 }}>
          <Link
            href="/contact"
            className="flex items-center justify-center"
            style={{
              backgroundColor: 'var(--ryokan-gold, #8B6914)',
              padding: '14px 48px',
              borderRadius: 2,
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--ryokan-text-on-dark, #FAF8F3)',
              letterSpacing: 3,
              textDecoration: 'none',
            }}
          >
            お問い合わせ
          </Link>

          <a
            href="tel:0460-83-XXXX"
            className="flex items-center justify-center"
            style={{
              padding: '14px 48px',
              borderRadius: 2,
              border: '1px solid #D4C5A088',
              backgroundColor: 'transparent',
              fontFamily: 'var(--font-accent)',
              fontSize: 16,
              fontWeight: 500,
              color: 'var(--ryokan-text-on-dark, #FAF8F3)',
              letterSpacing: 2,
              textDecoration: 'none',
            }}
          >
            0460-83-XXXX
          </a>
        </div>
      </div>
    </section>
  )
}
