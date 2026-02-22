import Image from 'next/image'

export function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: 780 }}
    >
      {/* Background image */}
      <Image
        src="/images/hero.png"
        alt="芦ノ湖畔の月瀬庵"
        fill
        className="object-cover"
        priority
        quality={85}
        sizes="100vw"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: '#1A150E77' }}
        aria-hidden="true"
      />

      {/* Hero Content */}
      <div
        className="relative z-10 flex flex-col gap-8"
        style={{ padding: '220px 0 0 100px' }}
      >
        {/* Location label row */}
        <div className="flex items-center gap-3">
          <span
            className="block"
            style={{
              width: 40,
              height: 1,
              backgroundColor: 'var(--ryokan-light-gold)',
            }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--ryokan-text-subtle)',
              letterSpacing: 5,
            }}
          >
            箱根 芦ノ湖畔
          </span>
        </div>

        {/* Main headline */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 48,
            fontWeight: 700,
            color: 'var(--ryokan-text-on-dark)',
            letterSpacing: 6,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          月瀬庵
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 20,
            fontWeight: 300,
            color: 'var(--ryokan-text-on-dark)',
            letterSpacing: 4,
            margin: 0,
          }}
        >
          心を解くひととき
        </p>

        {/* English label */}
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 14,
            fontWeight: 400,
            color: 'var(--ryokan-text-subtle)',
            letterSpacing: 6,
            textTransform: 'uppercase' as const,
          }}
        >
          TSUKISE-AN
        </span>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5"
        style={{ bottom: 40 }}
      >
        <span
          className="block"
          style={{
            width: 1,
            height: 20,
            backgroundColor: 'var(--ryokan-text-on-dark)',
          }}
          aria-hidden="true"
        />
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 10,
            fontWeight: 400,
            color: 'var(--ryokan-text-on-dark)',
            letterSpacing: 2,
          }}
        >
          Scroll
        </span>
      </div>
    </section>
  )
}
