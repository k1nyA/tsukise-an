export function ConceptSection() {
  return (
    <section
      id="concept"
      className="flex w-full flex-col items-center"
      style={{
        padding: 'var(--r-concept-py) var(--r-concept-px)',
        gap: 'var(--r-concept-gap)',
        backgroundImage: 'url(/images/top-concept-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Section Label with decorative lines */}
      <div className="flex items-center" style={{ gap: 20 }}>
        <span
          className="block"
          style={{
            width: 'var(--r-concept-label-line-w)',
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
            color: 'var(--ryokan-subtle)',
            letterSpacing: 5,
          }}
        >
          CONCEPT
        </span>
        <span
          className="block"
          style={{
            width: 'var(--r-concept-label-line-w)',
            height: 1,
            backgroundColor: 'var(--ryokan-light-gold)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Section Title */}
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--r-concept-title)',
          fontWeight: 600,
          color: 'var(--ryokan-dark)',
          letterSpacing: 'var(--r-concept-title-ls)',
          textAlign: 'center',
          margin: 0,
          width: '100%',
        }}
      >
        百三十年、変わらぬもてなし。
      </h2>

      {/* Body Text */}
      <p
        className="r-concept-body"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--r-concept-body-size)',
          fontWeight: 300,
          color: 'var(--ryokan-muted)',
          letterSpacing: 'var(--r-concept-body-ls)',
          lineHeight: 'var(--r-concept-body-lh)',
          margin: 0,
          width: '100%',
        }}
      >
        明治二十八年の創業以来、月瀬庵は箱根・芦ノ湖畔に静かに佇んでまいりました。
        <br />
        湖面に映る月の美しさに心を奪われた初代が、この地に宿を開いたのが始まりです。
        <br />
        <br />
        木漏れ日の差す回廊、苔むした石庭、そして湯けむりの向こうに広がる芦ノ湖の眺め。
        <br />
        時の流れを忘れ、ただ静かに自分に還る — そんな時間をお約束いたします。
      </p>

      {/* Decorative vertical line */}
      <span
        style={{ width: 1, height: 40, backgroundColor: 'var(--ryokan-light-gold)' }}
        aria-hidden="true"
      />
    </section>
  )
}
