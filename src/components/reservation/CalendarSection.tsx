export function CalendarSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-light-bg, #F0EBE0)',
        padding: '60px 120px',
        gap: 32,
      }}
    >
      {/* Label */}
      <div className="flex items-center" style={{ gap: 16 }}>
        <span
          className="block"
          style={{
            width: 30,
            height: 1,
            backgroundColor: 'var(--ryokan-gold, #8B6914)',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--ryokan-gold, #8B6914)',
            letterSpacing: 5,
          }}
        >
          SELECT DATE
        </span>
      </div>

      {/* Title */}
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 24,
          fontWeight: 600,
          color: 'var(--ryokan-dark, #2C2418)',
          letterSpacing: 4,
        }}
      >
        ご宿泊日を選択
      </h2>

      {/* Cal.com widget placeholder */}
      <div
        data-testid="cal-widget"
        className="flex w-full flex-col items-center justify-center"
        style={{
          backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
          height: 400,
          borderRadius: 8,
          border: '1px solid rgba(212, 197, 160, 0.2)',
          gap: 16,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            fontSize: 48,
            color: 'var(--ryokan-light-gold, #D4C5A0)',
          }}
        >
          📅
        </span>

        <p
          className="text-center"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16,
            fontWeight: 300,
            color: 'var(--ryokan-subtle, #8B7D6B)',
            lineHeight: 1.8,
            whiteSpace: 'pre-line',
          }}
        >
          {'Cal.com カレンダーウィジェット\n埋め込みエリア'}
        </p>

        <p
          className="text-center"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            fontWeight: 300,
            color: 'var(--ryokan-accent, #C4B89A)',
          }}
        >
          ※ 実際のサイトでは Cal.com のカレンダーが表示されます
        </p>
      </div>
    </section>
  )
}
