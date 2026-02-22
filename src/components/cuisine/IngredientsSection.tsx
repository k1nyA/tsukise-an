export function IngredientsSection() {
  return (
    <section className="flex w-full overflow-hidden" style={{ height: 480 }}>
      {/* Image placeholder */}
      <div
        aria-label="食材のイメージ"
        className="flex-shrink-0"
        style={{
          width: 640,
          height: 480,
          backgroundColor: 'var(--ryokan-darkest, #1A150E)',
        }}
      />

      {/* Content */}
      <div
        className="flex flex-1 flex-col justify-center"
        style={{
          backgroundColor: 'var(--ryokan-light-bg-alt, #F0EBE0)',
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
            INGREDIENTS
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 28,
            fontWeight: 600,
            color: 'var(--ryokan-dark, #2C2418)',
            letterSpacing: 4,
          }}
        >
          食材へのこだわり
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            fontWeight: 300,
            color: 'var(--ryokan-secondary, #6B5D4F)',
            letterSpacing: 1,
            lineHeight: 2.2,
            whiteSpace: 'pre-line',
          }}
        >
          {`小田原漁港から届く朝獲れの鮮魚、\n箱根の山が育む山菜や茸、\n地元農家から届く有機野菜。\n\n料理長自ら毎朝市場に足を運び、\nその日最も旬を迎えた素材だけを\n厳選して仕入れています。\n\n「この土地でしか味わえない一皿」を\nお届けすることが私たちの誇りです。`}
        </p>
      </div>
    </section>
  )
}
