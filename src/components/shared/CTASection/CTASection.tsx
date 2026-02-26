import Image from 'next/image'
import Link from 'next/link'

export function CTASection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: 'var(--r-cta-height)' }}
    >
      <Image
        src="/images/shared-cta-bg.png"
        alt=""
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
        style={{
          gap: 'var(--r-cta-gap)',
          padding: '0 var(--r-cta-content-px)',
        }}
      >
        <div className="flex flex-col items-center" style={{ gap: 16, width: '100%' }}>
          <span
            style={{ width: 1, height: 30, backgroundColor: '#D4C5A088' }}
            aria-hidden="true"
          />
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--r-cta-title)',
              fontWeight: 600,
              color: '#FAF8F3',
              letterSpacing: 'var(--r-cta-title-ls)',
              lineHeight: 1.8,
              textAlign: 'center',
              margin: 0,
            }}
          >
            あなたの特別な一日を、
            <br />
            月瀬庵でお過ごしください。
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--r-cta-sub)',
              fontWeight: 300,
              color: 'var(--ryokan-text-subtle, #C4B89A)',
              letterSpacing: 'var(--r-cta-sub-ls)',
              textAlign: 'center',
              margin: 0,
            }}
          >
            ご予約・お問い合わせはお電話またはオンラインにて承ります
          </p>
        </div>

        <div
          className="r-cta-btns items-center"
          style={{ gap: 'var(--r-cta-btn-gap)' }}
        >
          <Link
            href="/reservation"
            className="flex items-center justify-center"
            style={{
              backgroundColor: 'var(--ryokan-gold, #8B6914)',
              padding: 'var(--r-cta-btn-py) var(--r-cta-btn-px)',
              border: '1px solid var(--ryokan-gold, #8B6914)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--r-body-sm)',
              fontWeight: 500,
              color: '#FAF8F3',
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
              padding: 'var(--r-cta-btn-py) var(--r-cta-btn-px)',
              border: '1px solid #D4C5A088',
              backgroundColor: 'transparent',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--r-body-sm)',
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
