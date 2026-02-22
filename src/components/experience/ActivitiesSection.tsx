import { SectionLabel } from '@/components/shared/SectionLabel'

const activities = [
  {
    title: '芦ノ湖遊覧船',
    description: '海賊船で芦ノ湖を周遊。\n箱根神社の鳥居も湖上から',
  },
  {
    title: '箱根旧街道ウォーク',
    description: '江戸時代の石畳を歩く\n歴史散策コース',
  },
  {
    title: '寄木細工体験',
    description: '箱根伝統の工芸品を\nご自身の手で',
  },
  {
    title: '箱根神社参拝',
    description: '縁結びの名所として\n名高い古社へ',
  },
]

export function ActivitiesSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundImage: 'var(--experience-activities-bg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 120px',
        gap: 48,
      }}
    >
      {/* Label */}
      <SectionLabel english="ACTIVITIES" variant="gold" />

      {/* Title */}
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 28,
          fontWeight: 600,
          color: 'var(--ryokan-bg, #FAF8F3)',
          letterSpacing: 4,
          margin: 0,
        }}
      >
        周辺のお愉しみ
      </h2>

      {/* Activity cards grid */}
      <div className="flex w-full" style={{ gap: 40 }}>
        {activities.map((activity) => (
          <div
            key={activity.title}
            data-testid="activity-card"
            className="flex flex-1 flex-col items-center"
            style={{ gap: 12 }}
          >
            <h3
              className="text-center"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--ryokan-bg, #FAF8F3)',
                letterSpacing: 2,
                margin: 0,
              }}
            >
              {activity.title}
            </h3>
            <p
              className="w-full text-center"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                fontWeight: 300,
                color: 'var(--ryokan-muted-gold, #C4B89A)',
                lineHeight: 2,
                margin: 0,
                whiteSpace: 'pre-line',
              }}
            >
              {activity.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
