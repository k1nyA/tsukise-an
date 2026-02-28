import { SectionLabel } from '@/components/shared/SectionLabel'

const qualityCards = [
  { label: '源泉名', value: '姥子温泉\n（うばこおんせん）' },
  { label: '泉質', value: '単純硫黄泉' },
  { label: '泉温', value: '源泉 62.3℃\n浴槽 41〜43℃' },
  { label: '効能', value: '神経痛・筋肉痛\n関節痛・冷え性\n美肌効果' },
] as const

export function WaterQualitySection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: 'url(/images/onsen-water-quality-bg.png)',
      }}
    >
      {/* Dark overlay for readability */}
      <div
        className="flex flex-col items-center"
        style={{
          padding: 'var(--r-onsen-wq-py) var(--r-onsen-wq-px)',
          gap: 'var(--r-onsen-wq-gap)',
          backgroundColor: 'rgba(44, 36, 24, 0.75)',
        }}
      >
        {/* English label */}
        <SectionLabel english="WATER QUALITY" variant="gold" />

        {/* Title */}
        <h2
          className="text-center"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--r-onsen-wq-title-size)',
            fontWeight: 600,
            color: 'var(--ryokan-text-on-dark, #FAF8F3)',
            letterSpacing: 'var(--r-onsen-wq-title-ls)',
            margin: 0,
          }}
        >
          泉質と効能
        </h2>

        {/* Quality info card grid */}
        <div className="r-onsen-wq-info-grid w-full">
          {qualityCards.map((card) => (
            <div
              key={card.label}
              className="flex flex-col"
              style={{
                backgroundColor: '#3A3020',
                minHeight: 168,
                padding: '24px 32px',
                gap: 12,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--ryokan-gold, #8B6914)',
                  letterSpacing: 2,
                }}
              >
                {card.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 300,
                  color: 'var(--ryokan-text-subtle, #D4C5A0)',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-line',
                }}
              >
                {card.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
