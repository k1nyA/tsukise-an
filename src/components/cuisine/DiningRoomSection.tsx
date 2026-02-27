import Image from 'next/image'

export function DiningRoomSection() {
  return (
    <section className="r-imgtext-layout w-full overflow-hidden">
      {/* Image (left on PC/Tablet, top on Mobile) */}
      <div
        className="relative overflow-hidden"
        style={{
          width: 'var(--r-imgtext-img-width)',
          height: 'var(--r-imgtext-img-h)',
          flexShrink: 0,
          minHeight: 280,
        }}
      >
        <Image
          src="/images/cuisine-ingredients-main.png"
          alt="食事処のイメージ"
          fill
          className="object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 450px, 800px"
        />
      </div>

      {/* Content (right on PC/Tablet, bottom on Mobile) */}
      <div
        className="flex flex-col justify-center"
        style={{
          flex: 1,
          backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
          padding: 'var(--r-imgtext-padding)',
          gap: 'var(--r-imgtext-gap)',
        }}
      >
        {/* Label */}
        <div
          className="flex items-center"
          style={{ gap: 'var(--r-imgtext-label-gap)' }}
        >
          <span
            className="block"
            style={{
              width: 'var(--r-imgtext-label-line-w)',
              height: 1,
              backgroundColor: 'var(--ryokan-gold, #8B6914)',
            }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--ryokan-gold, #8B6914)',
              letterSpacing: 'var(--r-imgtext-label-ls)',
            }}
          >
            DINING
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--r-title-xs)',
            fontWeight: 600,
            color: 'var(--ryokan-dark, #2C2418)',
            letterSpacing: 'var(--r-title-spacing-sm)',
            margin: 0,
          }}
        >
          食事処「月影」
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--r-body-sm)',
            fontWeight: 300,
            color: 'var(--ryokan-secondary, #6B5D4F)',
            letterSpacing: 0.5,
            lineHeight: 2,
            whiteSpace: 'pre-line',
            margin: 0,
          }}
        >
          {`お食事は、離れの食事処「月影」にてご用意いたします。\n完全個室の空間で、他のお客様を気にすることなく\nごゆっくりとお召し上がりいただけます。\n\n窓越しに望む芦ノ湖の景色とともに、\n料理長が心を込めてお届けする一皿一皿を\nどうぞお愉しみください。`}
        </p>
      </div>
    </section>
  )
}
