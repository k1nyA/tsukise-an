import Image from 'next/image'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: 480 }}>
      <Image
        src="/images/cta.png"
        alt="月瀬庵の夜景"
        fill
        className="object-cover"
        quality={85}
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: '#1A150E88' }}
        aria-hidden="true"
      />

      <div
        className="relative z-10 flex h-full w-full flex-col items-center justify-center"
        style={{ gap: 40 }}
      >
        <div className="flex flex-col items-center" style={{ gap: 16 }}>
          <span
            style={{ width: 1, height: 30, backgroundColor: '#D4C5A088' }}
            aria-hidden="true"
          />
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 28,
              fontWeight: 600,
              color: '#faf8f3',
              letterSpacing: 3,
              lineHeight: 1.8,
              textAlign: 'center',
              margin: 0,
              maxWidth: 700,
            }}
          >
            あなたの特別な一日を、
            <br />
            月瀬庵でお過ごしください。
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 300,
              color: 'var(--ryokan-text-subtle)',
              letterSpacing: 2,
              margin: 0,
            }}
          >
            ご予約・お問い合わせはお電話またはオンラインにて承ります
          </p>
        </div>

        <div className="flex items-center" style={{ gap: 24 }}>
          <Link
            href="/reservation"
            className="flex items-center justify-center"
            style={{
              backgroundColor: 'var(--ryokan-gold)',
              padding: '16px 48px',
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 500,
              color: '#faf8f3',
              letterSpacing: 3,
              textDecoration: 'none',
            }}
          >
            オンライン予約
          </Link>
          <a
            href="tel:0460-83-XXXX"
            className="flex items-center justify-center"
            style={{
              padding: '16px 48px',
              border: '1px solid #D4C5A0',
              backgroundColor: 'transparent',
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 500,
              color: '#D4C5A0',
              letterSpacing: 3,
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
