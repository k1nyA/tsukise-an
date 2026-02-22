import { SectionLabel } from '@/components/shared/SectionLabel'

export function ConceptSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-bg)',
        padding: '120px 80px',
        gap: 56,
      }}
    >
      {/* Label */}
      <SectionLabel english="CONCEPT" />

      {/* Title */}
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 32,
          fontWeight: 600,
          color: 'var(--ryokan-dark)',
          letterSpacing: 4,
          textAlign: 'center',
          margin: 0,
        }}
      >
        百三十年、変わらぬもてなし。
      </h2>

      {/* Body text */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          fontWeight: 300,
          color: 'var(--ryokan-muted)',
          letterSpacing: 1,
          lineHeight: 2,
          textAlign: 'center',
          maxWidth: 640,
          margin: 0,
        }}
      >
        明治二十八年の創業以来、月瀬庵は箱根・芦ノ湖畔に静かに佇んでまいりました。
        湖面に映る月の美しさに心を奪われた初代が、この地に宿を開いたのが始まりです。
        <br />
        <br />
        木漏れ日の差す回廊、苔むした石庭、そして湯けむりの向こうに広がる芦ノ湖の眺め。
        時の流れを忘れ、ただ静かに自分に還る — そんな時間をお約束いたします。
      </p>

      {/* Decorative line */}
      <span
        className="block"
        style={{
          width: 1,
          height: 40,
          backgroundColor: 'var(--ryokan-light-gold)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}
