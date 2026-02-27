import Image from 'next/image'

export function BreakfastSection() {
  return (
    <section className="r-textimg-layout w-full overflow-hidden">
      {/* Content - dark background (left on PC/Tablet, bottom on Mobile via column-reverse) */}
      <div
        data-testid="breakfast-content"
        className="flex flex-col justify-center"
        style={{
          flex: 1,
          backgroundColor: 'var(--ryokan-dark, #2C2418)',
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
            BREAKFAST
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--r-title-sm)',
            fontWeight: 600,
            color: 'var(--ryokan-text-on-dark, #FAF8F3)',
            letterSpacing: 'var(--r-title-spacing-sm)',
            margin: 0,
          }}
        >
          朝餉
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--r-body-md)',
            fontWeight: 300,
            color: 'var(--ryokan-light-gold, #D4C5A0)',
            letterSpacing: 1,
            lineHeight: 2.2,
            whiteSpace: 'pre-line',
            margin: 0,
          }}
        >
          {`箱根の朝を迎える、心温まる朝餉。\n炊きたての土鍋ご飯、焼き魚、\n地元の豆腐や漬物を中心に、\n滋味深い和朝食をご用意いたします。\n\n朝の芦ノ湖を眺めながら、\n旅の朝を彩るひとときをお過ごしください。`}
        </p>
      </div>

      {/* Image (right on PC/Tablet, top on Mobile via column-reverse) */}
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
          src="/images/cuisine-breakfast-main.png"
          alt="朝食のイメージ"
          fill
          className="object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 450px, 800px"
        />
      </div>
    </section>
  )
}
