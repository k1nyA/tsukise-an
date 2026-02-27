const methods = [
  {
    icon: 'monitor',
    name: 'オンライン予約',
    description: 'Cal.comより24時間\nいつでもご予約いただけます',
  },
  {
    icon: 'phone',
    name: 'お電話',
    description: '0460-83-XXXX\n受付時間 9:00〜20:00',
  },
  {
    icon: 'globe',
    name: '旅行サイト',
    description: '一休.com等の\n旅行予約サイトからもご予約可能',
  },
]

export function BookingMethodsSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: 'var(--r-resv-booking-py) var(--r-resv-booking-px)',
        gap: 32,
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
        ご予約方法
      </h2>

      <div className="r-resv-booking-grid">
        {methods.map((method) => (
          <div
            key={method.name}
            data-testid="booking-method-card"
            className="flex flex-col items-center"
            style={{
              backgroundColor: 'var(--ryokan-light-bg, #F0EBE0)',
              borderRadius: 4,
              padding: '28px 24px',
              gap: 12,
            }}
          >
            {/* Icon placeholder */}
            <span
              aria-hidden="true"
              style={{
                width: 28,
                height: 28,
                color: 'var(--ryokan-gold, #8B6914)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
              }}
            >
              {method.icon === 'monitor' && '🖥'}
              {method.icon === 'phone' && '📞'}
              {method.icon === 'globe' && '🌐'}
            </span>

            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--ryokan-dark, #2C2418)',
                letterSpacing: 2,
              }}
            >
              {method.name}
            </h3>

            <p
              className="text-center"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                fontWeight: 300,
                color: 'var(--ryokan-subtle, #8B7D6B)',
                letterSpacing: 1,
                lineHeight: 1.8,
                whiteSpace: 'pre-line',
              }}
            >
              {method.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
