import Image from 'next/image'

export function IngredientsSection() {
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
          alt="食材のイメージ"
          fill
          className="object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 450px, 800px"
        />
      </div>

      {/* Content */}
      <div
        className="flex flex-col justify-center"
        style={{
          flex: 1,
          backgroundColor: 'var(--ryokan-light-bg-alt, #F0EBE0)',
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
            INGREDIENTS
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--r-title-sm)',
            fontWeight: 600,
            color: 'var(--ryokan-dark, #2C2418)',
            letterSpacing: 'var(--r-title-spacing-sm)',
            margin: 0,
          }}
        >
          食材へのこだわり
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--r-body-md)',
            fontWeight: 300,
            color: 'var(--ryokan-secondary, #6B5D4F)',
            letterSpacing: 1,
            lineHeight: 2.2,
            whiteSpace: 'pre-line',
            margin: 0,
          }}
        >
          {`小田原漁港から届く朝獲れの鮮魚、\n箱根の山が育む山菜や茸、\n地元農家から届く有機野菜。\n\n料理長自ら毎朝市場に足を運び、\nその日最も旬を迎えた素材だけを\n厳選して仕入れています。\n\n「この土地でしか味わえない一皿」を\nお届けすることが私たちの誇りです。`}
        </p>
      </div>
    </section>
  )
}
