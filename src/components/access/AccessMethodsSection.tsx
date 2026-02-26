import { TrainFront, Car, Bus } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type AccessMethod = {
  icon: LucideIcon
  title: string
  body: string
}

const accessMethods: AccessMethod[] = [
  {
    icon: TrainFront,
    title: '電車でお越しの方',
    body: '新宿駅\n↓ 小田急ロマンスカー（約85分）\n箱根湯本駅\n↓ 箱根登山バス（約40分）\n元箱根港\n↓ 送迎車（約5分）\n月瀬庵',
  },
  {
    icon: Car,
    title: 'お車でお越しの方',
    body: '東名高速道路\n↓ 御殿場IC（約10分）\n箱根スカイライン\n↓ 芦ノ湖方面（約20分）\n\n駐車場：8台（無料）',
  },
  {
    icon: Bus,
    title: '送迎サービス',
    body: '箱根湯本駅・元箱根港から\n無料送迎を承っております。\n\nご予約時にお申し付けください。\n\n運行時間：14:00〜18:00',
  },
  {
    icon: Bus,
    title: 'バスでお越しの方',
    body: '小田原駅より箱根登山バス\n「元箱根」バス停下車（約60分）\n送迎バスで約5分',
  },
]

export function AccessMethodsSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: 'var(--r-access-methods-py) var(--r-access-methods-px)',
        gap: 40,
      }}
    >
      {/* Section title */}
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 28,
          fontWeight: 600,
          color: 'var(--ryokan-dark, #2C2418)',
          letterSpacing: 4,
        }}
      >
        アクセス方法
      </h2>

      {/* Access method cards */}
      <div className="r-access-methods-grid w-full">
        {accessMethods.map((method) => {
          const IconComponent = method.icon
          return (
            <div
              key={method.title}
              data-testid="access-method-card"
              className="flex flex-col items-center"
              style={{
                backgroundColor: 'var(--ryokan-info-bg, #F0EBE0)',
                borderRadius: 4,
                padding: '32px 28px',
                gap: 20,
              }}
            >
              {/* Icon */}
              <IconComponent
                size={32}
                style={{ color: 'var(--ryokan-gold, #8B6914)' }}
                strokeWidth={1.5}
                aria-hidden="true"
              />

              {/* Title */}
              <h3
                className="text-center"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--ryokan-dark, #2C2418)',
                  letterSpacing: 2,
                }}
              >
                {method.title}
              </h3>

              {/* Body text */}
              <p
                className="w-full text-center"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'var(--ryokan-secondary, #6B5D4F)',
                  lineHeight: 2.0,
                  whiteSpace: 'pre-line',
                }}
              >
                {method.body}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
