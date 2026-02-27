import Image from 'next/image'

const facilities = [
  {
    title: 'ラウンジ「月影」',
    description: '芦ノ湖を一望するラウンジで\nお抹茶やハーブティーを\n無料でご提供',
  },
  {
    title: 'ライブラリー',
    description: '旅や文学に関する蔵書を\n約500冊ご用意',
  },
  {
    title: 'SPA「月光」',
    description: 'アロマトリートメントで\n心身の疲れを癒してください',
  },
]

export function FacilitiesSection() {
  return (
    <section
      className="r-exp-facility-layout w-full overflow-hidden"
      style={{ height: 'var(--r-exp-facility-h)' }}
    >
      {/* Left: Image */}
      <div
        data-testid="facility-image"
        className="r-exp-facility-img relative overflow-hidden"
      >
        <Image
          src="/images/experience-facilities-main.png"
          alt="館内施設"
          fill
          className="object-cover"
          sizes="(max-width: 767px) 100vw, 640px"
        />
      </div>

      {/* Right: Content */}
      <div
        className="flex flex-1 flex-col justify-center"
        style={{
          backgroundColor: 'var(--ryokan-warm-bg, #F0EBE0)',
          padding: 'var(--r-exp-facility-padding)',
          gap: 'var(--r-exp-facility-gap)',
          height: '100%',
        }}
      >
        {/* Label */}
        <div className="flex items-center" style={{ gap: 16 }}>
          <span
            className="block"
            style={{
              width: 30,
              height: 1,
              backgroundColor: 'var(--ryokan-gold-dark, #8B6914)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--ryokan-gold-dark, #8B6914)',
              letterSpacing: 5,
            }}
          >
            LOUNGE & SPA
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--r-exp-facility-title)',
            fontWeight: 600,
            color: 'var(--ryokan-dark, #2C2418)',
            letterSpacing: 'var(--r-exp-facility-title-ls)',
            margin: 0,
          }}
        >
          館内施設
        </h2>

        {/* Facility cards */}
        <div className="r-exp-facility-cards">
          {facilities.map((facility) => (
            <div
              key={facility.title}
              data-testid="facility-card"
              className="flex flex-1 flex-col items-center"
              style={{
                backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
                borderRadius: 4,
                padding: '20px 16px',
                gap: 12,
              }}
            >
              <h3
                className="text-center"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--ryokan-dark, #2C2418)',
                  margin: 0,
                }}
              >
                {facility.title}
              </h3>
              <p
                className="text-center"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'var(--ryokan-secondary, #6B5D4F)',
                  lineHeight: 1.8,
                  margin: 0,
                  whiteSpace: 'pre-line',
                }}
              >
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
