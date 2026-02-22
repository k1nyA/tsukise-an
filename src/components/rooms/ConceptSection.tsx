export function ConceptSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{ padding: '100px 200px', gap: 48 }}
    >
      {/* Label with decorative lines */}
      <div className="flex items-center" style={{ gap: 20 }}>
        <span
          className="block"
          style={{
            width: 40,
            height: 1,
            backgroundColor: 'var(--ryokan-light-gold, #D4C5A0)',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--ryokan-subtle, #8B7D6B)',
            letterSpacing: 5,
          }}
        >
          CONCEPT
        </span>
        <span
          className="block"
          style={{
            width: 40,
            height: 1,
            backgroundColor: 'var(--ryokan-light-gold, #D4C5A0)',
          }}
        />
      </div>

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
        離れの贅、静寂の時。
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
          maxWidth: 600,
        }}
      >
        月瀬庵の客室は、すべて独立した離れ形式。
        <br />
        芦ノ湖を望む自然の中に点在する八つの棟は、
        <br />
        それぞれに異なる趣を持ちながら、
        <br />
        共通して「静寂」と「眺望」を大切にしています。
        <br />
        <br />
        全室に源泉掛け流しの専用露天風呂を備え、
        <br />
        時を忘れてお寛ぎいただける空間をご用意しました。
      </p>

      {/* Decorative vertical line */}
      <span
        data-testid="concept-deco-line"
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
