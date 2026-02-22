import { SectionLabel } from '@/components/shared/SectionLabel/SectionLabel'

const steps = [
  { number: '1', label: '客室タイプを選択' },
  { number: '2', label: '日程を選択' },
  { number: '3', label: '予約確定' },
]

export function ReservationIntroSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: '80px 200px',
        gap: 32,
      }}
    >
      <SectionLabel english="BOOKING FLOW" />

      <h2
        className="text-center"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 28,
          fontWeight: 600,
          color: 'var(--ryokan-dark, #2C2418)',
          letterSpacing: 4,
        }}
      >
        ご予約の流れ
      </h2>

      <div
        className="flex w-full items-center justify-center"
        style={{ gap: 40 }}
      >
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center" style={{ gap: 40 }}>
            {/* Arrow before step (except first) */}
            {index > 0 && (
              <span
                data-testid="step-arrow"
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: 24,
                  color: 'var(--ryokan-light-gold, #D4C5A0)',
                }}
              >
                →
              </span>
            )}

            {/* Step */}
            <div
              className="flex flex-col items-center"
              style={{ gap: 12, width: 200 }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: 'var(--ryokan-gold, #8B6914)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-accent)',
                    fontSize: 16,
                    fontWeight: 600,
                    color: 'var(--ryokan-bg, #FAF8F3)',
                  }}
                >
                  {step.number}
                </span>
              </div>
              <span
                className="text-center"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--ryokan-dark, #2C2418)',
                  letterSpacing: 1,
                }}
              >
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
