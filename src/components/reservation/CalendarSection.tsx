import ReservationCalendar from '@/components/ReservationCalendar'
import { buildCalLinkFromProcessEnv } from '@/lib/calcom'

export function CalendarSection() {
  let calLink: string | null = null
  let envError: string | null = null

  try {
    calLink = buildCalLinkFromProcessEnv()
  } catch (error) {
    envError = error instanceof Error ? error.message : '予約設定の読み込みに失敗しました。'
  }

  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-light-bg, #F0EBE0)',
        padding: 'var(--r-resv-calendar-py) var(--r-resv-calendar-px)',
        gap: 32,
      }}
    >
      <div className="flex items-center" style={{ gap: 16 }}>
        <span
          className="block"
          style={{
            width: 30,
            height: 1,
            backgroundColor: 'var(--ryokan-gold, #8B6914)',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--ryokan-gold, #8B6914)',
            letterSpacing: 5,
          }}
        >
          SELECT DATE
        </span>
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 24,
          fontWeight: 600,
          color: 'var(--ryokan-dark, #2C2418)',
          letterSpacing: 4,
        }}
      >
        ご宿泊日を選択
      </h2>

      <div
        className="flex w-full flex-col items-center justify-center"
        style={{
          backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
          minHeight: 400,
          borderRadius: 8,
          border: '1px solid rgba(212, 197, 160, 0.2)',
          gap: 16,
          padding: 12,
        }}
      >
        {calLink ? (
          <ReservationCalendar calLink={calLink} />
        ) : (
          <div
            role="alert"
            className="flex w-full flex-col items-center justify-center"
            style={{ gap: 12, padding: '24px 16px' }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 20,
                fontWeight: 600,
                color: 'var(--ryokan-dark, #2C2418)',
              }}
            >
              オンライン予約の準備中です
            </h3>
            <p
              className="text-center"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 300,
                color: 'var(--ryokan-subtle, #8B7D6B)',
                lineHeight: 1.8,
              }}
            >
              {envError}
            </p>
            <p
              className="text-center"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                fontWeight: 300,
                color: 'var(--ryokan-accent, #C4B89A)',
              }}
            >
              お急ぎの場合はお電話にてお問い合わせください。
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
