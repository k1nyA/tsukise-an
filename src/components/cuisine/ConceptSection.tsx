import { SectionLabel } from '@/components/shared/SectionLabel'

export function ConceptSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{ padding: '100px 200px', gap: 48 }}
    >
      {/* Label with decorative lines */}
      <SectionLabel english="PHILOSOPHY" />

      {/* Section title */}
      <h2
        className="text-center"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 32,
          fontWeight: 600,
          color: 'var(--ryokan-dark, #2C2418)',
          letterSpacing: 6,
        }}
      >
        土地の恵みを、一皿に。
      </h2>

      {/* Body text */}
      <p
        className="text-center"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          fontWeight: 300,
          color: 'var(--ryokan-secondary, #6B5D4F)',
          letterSpacing: 1.5,
          lineHeight: 2.4,
          maxWidth: 620,
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
