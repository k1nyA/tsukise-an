import { SectionLabel } from '@/components/shared/SectionLabel'

export function ConceptSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        padding: 'var(--r-cuisine-concept-py) var(--r-cuisine-concept-px)',
        gap: 'var(--r-cuisine-concept-gap)',
        backgroundImage: 'url(/images/cuisine-concept-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Label with decorative lines */}
      <SectionLabel english="PHILOSOPHY" />

      {/* Section title */}
      <h2
        className="r-cuisine-concept-body"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--r-cuisine-concept-title)',
          fontWeight: 600,
          color: 'var(--ryokan-dark, #2C2418)',
          letterSpacing: 'var(--r-cuisine-concept-title-ls)',
          margin: 0,
        }}
      >
        土地の恵みを、一皿に。
      </h2>

      {/* Body text */}
      <p
        className="r-cuisine-concept-body"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--r-cuisine-concept-body)',
          fontWeight: 300,
          color: 'var(--ryokan-secondary, #6B5D4F)',
          letterSpacing: 'var(--r-cuisine-concept-body-ls)',
          lineHeight: 'var(--r-cuisine-concept-body-lh)',
          maxWidth: 'var(--r-cuisine-concept-body-max-w)',
          margin: 0,
        }}
      >
        月瀬庵の料理長・水月が手掛ける月替わり懐石は、
        <br />
        箱根・小田原の海と山が育む食材を軸に、
        <br />
        季節の移ろいを一皿一皿に映し出します。
        <br />
        <br />
        器は地元の作家による特注品。
        <br />
        目で愉しみ、香りで感じ、舌で味わう
        <br />
        五感のすべてに響く料理をお届けいたします。
      </p>

      {/* Decorative vertical line */}
      <span
        data-testid="cuisine-concept-deco-line"
        className="block"
        style={{
          width: 1,
          height: 40,
          backgroundColor: 'var(--ryokan-light-gold, #D4C5A0)',
        }}
      />
    </section>
  )
}
