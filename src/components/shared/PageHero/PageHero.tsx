import Image from 'next/image'

export type PageHeroProps = {
  title: string
  labelEn: string
  subtitle?: string
  backgroundImage?: string
}

export function PageHero({ title, labelEn, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: 'var(--r-subpage-hero-height)' }}
    >
      {/* Background image */}
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          quality={85}
          sizes="100vw"
          priority
        />
      ) : (
        <div
          data-testid="hero-bg"
          className="absolute inset-0"
          style={{ backgroundColor: 'var(--ryokan-darkest, #1A150E)' }}
        />
      )}

      {/* Overlay */}
      <div
        data-testid="hero-overlay"
        className="absolute inset-0"
        style={{ backgroundColor: '#1A150E55' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="relative z-10 flex h-full w-full flex-col items-center justify-center"
        style={{
          gap: 'var(--r-subpage-hero-content-gap)',
          padding: '0 var(--r-subpage-hero-content-px)',
        }}
      >
        {/* Label with decorative lines */}
        <div
          className="flex items-center"
          style={{ gap: 'var(--r-subpage-hero-label-gap)' }}
        >
          <span
            data-testid="hero-deco-line"
            className="block"
            style={{
              width: 'var(--r-subpage-hero-label-line-w)',
              height: 1,
              backgroundColor: 'var(--ryokan-light-gold, #D4C5A0)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 'var(--r-subpage-hero-label-size)',
              fontWeight: 500,
              color: 'var(--ryokan-light-gold, #D4C5A0)',
              letterSpacing: 'var(--r-subpage-hero-label-ls)',
              textTransform: 'uppercase' as const,
            }}
          >
            {labelEn}
          </span>
          <span
            data-testid="hero-deco-line"
            className="block"
            style={{
              width: 'var(--r-subpage-hero-label-line-w)',
              height: 1,
              backgroundColor: 'var(--ryokan-light-gold, #D4C5A0)',
            }}
          />
        </div>

        {/* Title */}
        <h1
          className="text-center"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--r-subpage-hero-title-size)',
            fontWeight: 600,
            color: 'var(--ryokan-text-on-dark, #FAF8F3)',
            letterSpacing: 'var(--r-subpage-hero-title-ls)',
            margin: 0,
          }}
        >
          {title}
        </h1>

        {/* Subtitle (optional) */}
        {subtitle && (
          <p
            className="text-center"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--r-subpage-hero-sub-size)',
              fontWeight: 300,
              color: '#D4C5A088',
              letterSpacing: 'var(--r-subpage-hero-sub-ls)',
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
