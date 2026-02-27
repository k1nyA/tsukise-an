const guideItems = [
  { label: '大浴場', value: '15:00〜翌10:00（清掃時間 2:00〜5:00）' },
  { label: '露天風呂', value: '15:00〜翌10:00（男女入替 22:00）' },
  { label: '客室露天', value: '24時間（源泉掛け流し）' },
  { label: 'タオル', value: '大浴場・露天風呂にご用意しております' },
]

export function OnsenGuideSection() {
  return (
    <section
      className="r-onsen-guide-layout w-full"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: 'var(--r-onsen-guide-py) var(--r-onsen-guide-px)',
        gap: 'var(--r-onsen-guide-gap)',
      }}
    >
      {/* Title area */}
      <div
        className="flex flex-col"
        style={{
          gap: 16,
          width: 'var(--r-onsen-guide-title-w)',
          flexShrink: 0,
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
            GUIDE
          </span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 24,
            fontWeight: 600,
            color: 'var(--ryokan-dark, #2C2418)',
            letterSpacing: 4,
            margin: 0,
          }}
        >
          ご利用案内
        </h2>
      </div>

      {/* Guide rows */}
      <div
        className="flex w-full flex-col"
        style={{ gap: 'var(--r-onsen-guide-content-gap, 24px)' }}
      >
        {guideItems.map((item, i) => (
          <div
            key={item.label}
            className="flex w-full"
            style={{
              gap: 16,
              paddingBottom: i < guideItems.length - 1 ? 16 : 0,
              borderBottom:
                i < guideItems.length - 1
                  ? '1px solid rgba(212, 197, 160, 0.13)'
                  : 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--ryokan-dark, #2C2418)',
                letterSpacing: 1,
                flexShrink: 0,
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 300,
                color: 'var(--ryokan-secondary, #6B5D4F)',
                flex: 1,
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
