export function BreakfastSection() {
  return (
    <section className="flex w-full overflow-hidden" style={{ height: 480 }}>
      {/* Content - dark background, left side */}
      <div
        data-testid="breakfast-content"
        className="flex flex-1 flex-col justify-center"
        style={{
          backgroundColor: 'var(--ryokan-dark, #2C2418)',
          padding: 60,
          gap: 24,
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
            BREAKFAST
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 28,
            fontWeight: 600,
            color: 'var(--ryokan-text-on-dark, #FAF8F3)',
            letterSpacing: 4,
          }}
        >
          朝餉
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            fontWeight: 300,
            color: 'var(--ryokan-light-gold, #D4C5A0)',
            letterSpacing: 1,
            lineHeight: 2.2,
            whiteSpace: 'pre-line',
          }}
        >
          {`箱根の朝を迎える、心温まる朝餉。\n炊きたての土鍋ご飯、焼き魚、\n地元の豆腐や漬物を中心に、\n滋味深い和朝食をご用意いたします。\n\n朝の芦ノ湖を眺めながら、\n旅の朝を彩るひとときをお過ごしください。`}
        </p>
      </div>

      {/* Image placeholder - right side */}
      <div
        aria-label="朝食のイメージ"
        className="flex-shrink-0"
        style={{
          width: 640,
          height: 480,
          backgroundColor: 'var(--ryokan-darkest, #1A150E)',
        }}
      />
    </section>
  )
}
