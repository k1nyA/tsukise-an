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
      data-theme="dark"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: 'var(--ryokan-dark, #2C2418)',
        padding: '80px 120px',
      }}
    >
      <div className="mx-auto flex flex-col items-center gap-12" style={{ maxWidth: 'var(--content-max-width, 1000px)' }}>
        {/* English label */}
        <SectionLabel english="WATER QUALITY" variant="gold" />

        {/* Title */}
        <h2
          className="text-center"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 28,
            fontWeight: 600,
            color: 'var(--ryokan-text-on-dark, #FAF8F3)',
            letterSpacing: 4,
          }}
        >
          泉質と効能
        </h2>

        {/* Quality info grid */}
        <div className="flex w-full justify-center gap-16">
          {qualityInfo.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-3">
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
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
                  fontSize: 20,
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
              fontSize: 12,
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
                  fontSize: 15,
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
