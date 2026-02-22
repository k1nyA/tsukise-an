import Image from 'next/image'

const plans = [
  {
    name: 'スタンダードプラン',
    description: '一泊二食付きの基本プラン',
    price: '¥45,000〜',
    image: '/images/plans/standard.jpg',
  },
  {
    name: '記念日プラン',
    description: '特別な日を彩る記念日プラン',
    price: '¥65,000〜',
    image: '/images/plans/anniversary.jpg',
  },
  {
    name: '連泊プラン',
    description: '2泊以上でお得な連泊プラン',
    price: '¥40,000〜/泊',
    image: '/images/plans/consecutive.jpg',
  },
]

export function PlanSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-light-bg, #F0EBE0)',
        padding: '80px 120px',
        gap: 40,
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 24,
          fontWeight: 600,
          color: 'var(--ryokan-dark, #2C2418)',
          letterSpacing: 4,
        }}
      >
        宿泊プラン
      </h2>

      <div className="flex w-full" style={{ gap: 24 }}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            data-testid="plan-card"
            className="flex flex-1 flex-col overflow-hidden"
            style={{
              backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
              borderRadius: 4,
              border: '1px solid rgba(212, 197, 160, 0.2)',
            }}
          >
            {/* Plan image */}
            <div
              className="relative overflow-hidden"
              style={{
                height: 160,
                width: '100%',
                borderRadius: '4px 4px 0 0',
              }}
            >
              <Image
                src={plan.image}
                alt={plan.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Plan info */}
            <div
              className="flex flex-col"
              style={{
                padding: 24,
                gap: 16,
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--ryokan-dark, #2C2418)',
                  letterSpacing: 2,
                }}
              >
                {plan.name}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'var(--ryokan-subtle, #8B7D6B)',
                  letterSpacing: 1,
                }}
              >
                {plan.description}
              </p>

              <span
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: 20,
                  fontWeight: 700,
                  color: 'var(--ryokan-gold, #8B6914)',
                }}
              >
                {plan.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
