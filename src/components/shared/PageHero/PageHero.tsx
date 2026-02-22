export type PageHeroProps = {
  title: string
  labelEn: string
  backgroundImage?: string
}

export function PageHero({ title, labelEn, backgroundImage }: PageHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: 'var(--subpage-hero-height, 360px)' }}
    >
      {/* Background image */}
      <div
        data-testid="hero-bg"
        className="absolute inset-0 bg-cover bg-center"
        style={
          backgroundImage
            ? { backgroundImage: `url(${backgroundImage})` }
            : { backgroundColor: 'var(--ryokan-darkest, #1A150E)' }
        }
      />

      {/* Overlay */}
      <div
        data-testid="hero-overlay"
        className="absolute inset-0"
        style={{ backgroundColor: 'var(--ryokan-hero-overlay, #1A150E55)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6">
        {/* Label with decorative lines */}
        <div className="flex items-center gap-5">
          <span
            data-testid="hero-deco-line"
            className="block"
            style={{
              width: 40,
              height: 1,
              backgroundColor: 'var(--ryokan-light-gold, #D4C5A0)',
            }}
          />
          <span
            className="font-accent tracking-[6px] text-sm font-medium uppercase"
            style={{
              fontFamily: 'var(--font-accent)',
              color: 'var(--ryokan-light-gold, #D4C5A0)',
              fontSize: 14,
              letterSpacing: 6,
            }}
          >
            {labelEn}
          </span>
          <span
            data-testid="hero-deco-line"
            className="block"
            style={{
              width: 40,
              height: 1,
              backgroundColor: 'var(--ryokan-light-gold, #D4C5A0)',
            }}
          />
        </div>

        {/* Title */}
        <h1
          className="text-center font-semibold"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 48,
            color: 'var(--ryokan-text-on-dark, #FAF8F3)',
            letterSpacing: 8,
          }}
        >
          {title}
        </h1>
      </div>
    </section>
  )
}
