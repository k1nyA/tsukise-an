export function DiningRoomSection() {
  return (
    <section className="flex w-full overflow-hidden" style={{ height: 480 }}>
      {/* Image placeholder - left side */}
      <div
        aria-label="食事処のイメージ"
        className="flex-shrink-0"
        style={{
          width: 640,
          height: 480,
          backgroundColor: 'var(--ryokan-darkest, #1A150E)',
        }}
      />

      {/* Content - right side */}
      <div
        className="flex flex-1 flex-col justify-center"
        style={{
          backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
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
            DINING
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
          食事処「月影」
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 300,
            color: 'var(--ryokan-secondary, #6B5D4F)',
            letterSpacing: 0.5,
            lineHeight: 2,
            whiteSpace: 'pre-line',
          }}
        >
          {`お食事は、離れの食事処「月影」にてご用意いたします。\n完全個室の空間で、他のお客様を気にすることなく\nごゆっくりとお召し上がりいただけます。\n\n窓越しに望む芦ノ湖の景色とともに、\n料理長が心を込めてお届けする一皿一皿を\nどうぞお愉しみください。`}
        </p>
      </div>
    </section>
  )
}
