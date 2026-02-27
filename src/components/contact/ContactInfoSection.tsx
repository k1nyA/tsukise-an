const infoTitleStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  fontWeight: 500,
  color: 'var(--ryokan-subtle, #8B7D6B)',
  letterSpacing: 2,
} as const

const infoValueStyle = {
  fontFamily: 'var(--font-accent)',
  fontSize: 18,
  fontWeight: 500,
  color: 'var(--ryokan-dark, #2C2418)',
  letterSpacing: 2,
  textDecoration: 'none',
} as const

export function ContactInfoSection() {
  return (
    <section
      className="r-contact-info-layout w-full"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: 'var(--r-contact-info-py) var(--r-contact-info-px)',
        gap: 'var(--r-contact-info-gap)',
      }}
    >
      {/* Phone column */}
      <div
        className="flex flex-col items-center"
        style={{ width: 'var(--r-contact-phone-width)', gap: 20 }}
      >
        {/* Phone icon */}
        <svg
          aria-hidden="true"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--ryokan-gold, #8B6914)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>

        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 20,
            fontWeight: 600,
            color: 'var(--ryokan-dark, #2C2418)',
            letterSpacing: 3,
          }}
        >
          お電話でのお問い合わせ
        </h3>

        <a
          href="tel:0460-83-XXXX"
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 32,
            fontWeight: 500,
            color: 'var(--ryokan-dark, #2C2418)',
            letterSpacing: 3,
            textDecoration: 'none',
          }}
        >
          0460-83-XXXX
        </a>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            fontWeight: 300,
            color: 'var(--ryokan-secondary, #6B5D4F)',
            letterSpacing: 1,
          }}
        >
          受付時間：9:00〜20:00（年中無休）
        </p>
      </div>

      {/* Divider - hidden on Tablet/Mobile */}
      <span
        data-testid="contact-info-divider"
        className="r-contact-info-divider"
        style={{
          width: 1,
          height: 80,
          backgroundColor: 'var(--ryokan-light-gold, #D4C5A0)',
        }}
      />

      {/* Info row: FAX, Mail, LINE */}
      <div
        className="r-contact-info-items"
        style={{ gap: 'var(--r-contact-info-items-gap)' }}
      >
        {/* FAX column */}
        <div
          className="flex flex-col items-center"
          style={{ width: 160, gap: 12 }}
        >
          <svg
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--ryokan-subtle, #8B7D6B)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          <span style={infoTitleStyle}>FAX</span>
          <span style={infoValueStyle}>0460-83-XXXX</span>
        </div>

        {/* Mail column */}
        <div
          className="flex flex-col items-center"
          style={{ width: 180, gap: 12 }}
        >
          <svg
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--ryokan-subtle, #8B7D6B)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span style={infoTitleStyle}>メール</span>
          <a href="mailto:info@tsukise-an.jp" style={infoValueStyle}>
            info@tsukise-an.jp
          </a>
        </div>

        {/* LINE column */}
        <div
          className="flex flex-col items-center"
          style={{ width: 180, gap: 12 }}
        >
          <svg
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--ryokan-subtle, #8B7D6B)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span style={infoTitleStyle}>LINE公式アカウント</span>
          <span style={infoValueStyle}>@tsukise-an</span>
        </div>
      </div>
    </section>
  )
}
