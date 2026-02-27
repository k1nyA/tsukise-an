import { SectionLabel } from '@/components/shared/SectionLabel'

const efficacyItems = [
  '神経痛・筋肉痛',
  '疲労回復',
  '冷え性改善',
  '美肌効果',
] as const

const qualityInfo = [
  { label: '泉質', value: 'アルカリ性単純温泉' },
  { label: 'pH値', value: 'pH 8.5' },
  { label: '源泉温度', value: '62℃' },
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

        {/* Quality info grid */}
        <div className="r-onsen-wq-info-grid w-full">
          {qualityInfo.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-3">
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--r-onsen-wq-info-label-size)',
                  fontWeight: 300,
                  color: 'var(--ryokan-text-subtle, #C4B89A)',
                  letterSpacing: 2,
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--r-onsen-wq-info-val-size)',
                  fontWeight: 600,
                  color: 'var(--ryokan-text-on-dark, #FAF8F3)',
                  letterSpacing: 2,
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <span
          className="block"
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'var(--ryokan-soft-line, #D4C5A055)',
          }}
        />

        {/* Efficacy */}
        <div className="flex flex-col items-center gap-4">
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--r-onsen-wq-info-label-size)',
              fontWeight: 300,
              color: 'var(--ryokan-text-subtle, #C4B89A)',
              letterSpacing: 2,
            }}
          >
            効能
          </span>
          <div className="flex flex-wrap justify-center gap-8">
            {efficacyItems.map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--r-onsen-wq-efficacy-size)',
                  fontWeight: 300,
                  color: 'var(--ryokan-text-on-dark, #FAF8F3)',
                  letterSpacing: 1.5,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
