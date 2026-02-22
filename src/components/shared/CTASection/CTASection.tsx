import Image from 'next/image'
import Link from 'next/link'

export function CTASection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: 480 }}
    >
      {/* Background image */}
      <Image
        src="/images/cta.png"
        alt="月瀬庵の夜景"
        fill
        className="object-cover"
        quality={85}
        sizes="100vw"
      />

      {/* Overlay */}
      <div
        data-testid="cta-overlay"
        className="absolute inset-0"
        style={{ backgroundColor: '#1A150E88' }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-10">
        {/* Intro section */}
        <div className="flex flex-col items-center gap-4">
          {/* Decorative vertical line */}
          <span
            className="block"
            style={{
              width: 1,
              height: 30,
              backgroundColor: '#D4C5A088',
            }}
          />

          {/* Title */}
          <h2
            className="text-center font-semibold"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 28,
              color: '#FAFAF3',
              letterSpacing: 3,
              lineHeight: 1.8,
            }}
          >
            <span className="block">あなたの特別な一日を、</span>
            <span className="block">月瀬庵でお過ごしください。</span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 300,
              color: 'var(--ryokan-text-subtle, #C4B89A)',
              letterSpacing: 2,
            }}
          >
            ご予約・お問い合わせはお電話またはオンラインにて承ります
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-6">
          {/* Online reservation button */}
          <Link
            href="/reservation"
            className="flex items-center justify-center"
            style={{
              backgroundColor: 'var(--ryokan-gold, #8B6914)',
              padding: '16px 48px',
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 500,
              color: '#FAFAF3',
              letterSpacing: 3,
            }}
          >
            オンライン予約
          </Link>

          {/* Phone button */}
          <a
            href="tel:0460-83-XXXX"
            className="flex items-center justify-center"
            style={{
              padding: '16px 48px',
              border: '1px solid #D4C5A088',
              backgroundColor: 'transparent',
              fontFamily: 'var(--font-accent)',
              fontSize: 16,
              fontWeight: 500,
              color: '#FAFAF3',
              letterSpacing: 2,
            }}
          >
            0460-83-XXXX
          </a>
        </div>
      </div>
    </section>
  )
}
