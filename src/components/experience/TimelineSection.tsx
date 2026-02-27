const timelineEvening = [
  {
    time: '15:00',
    title: 'チェックイン・お出迎え',
    description: '芦ノ湖を望むロビーでお抹茶とともにお迎え',
    align: 'left' as const,
  },
  {
    time: '15:30',
    title: 'お部屋へご案内',
    description: '離れの客室で旅の疲れを癒すひととき',
    align: 'right' as const,
  },
  {
    time: '16:00',
    title: '客室露天風呂',
    description: 'プライベートな湯浴みの時間',
    align: 'left' as const,
  },
  {
    time: '17:00',
    title: '庭園散策',
    description: '四季折々の庭園をゆったりと散策',
    align: 'right' as const,
  },
  {
    time: '18:30',
    title: '夕食・懐石料理',
    description: '月替わり懐石を個室食事処で',
    align: 'left' as const,
  },
  {
    time: '20:00',
    title: '湯上がりラウンジ',
    description: '地酒やハーブティーでくつろぎのひと時',
    align: 'right' as const,
  },
  {
    time: '21:00',
    title: '月見の湯（大浴場）',
    description: '月明かりに照らされた露天風呂で至福のひととき',
    align: 'left' as const,
  },
]

const timelineMorning = [
  {
    time: '08:00',
    title: '朝食',
    description: '地元食材を活かした和朝食',
    align: 'right' as const,
  },
  {
    time: '10:00',
    title: 'チェックアウト準備',
    description: 'お荷物の準備とお土産選び',
    align: 'left' as const,
  },
  {
    time: '11:00',
    title: 'お見送り',
    description: 'またのお越しを心よりお待ちしております',
    align: 'right' as const,
    isLast: true,
  },
]

type TimelineItemProps = {
  time: string
  title: string
  description: string
  align: 'left' | 'right'
  isLast?: boolean
}

function TimelineItem({ time, title, description, align, isLast }: TimelineItemProps) {
  const timeContent = (
    <div
      className="r-exp-timeline-side flex"
      style={{
        justifyContent: align === 'left' ? 'flex-end' : 'flex-start',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-accent)',
          fontSize: 'var(--r-exp-timeline-time)',
          fontWeight: 700,
          color: 'var(--ryokan-light-gold, #D4C5A0)',
          textAlign: align === 'left' ? 'right' : 'left',
        }}
      >
        {time}
      </span>
    </div>
  )

  const infoContent = (
    <div
      className="r-exp-timeline-side flex flex-col"
      style={{
        gap: 8,
        alignItems: align === 'right' ? 'flex-end' : 'flex-start',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--r-exp-timeline-item-title)',
          fontWeight: 600,
          color: 'var(--ryokan-cream, #F5F0E8)',
          textAlign: align === 'right' ? 'right' : 'left',
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--r-exp-timeline-item-body)',
          fontWeight: 300,
          color: 'var(--ryokan-muted-gold, #C4B89A)',
          lineHeight: 1.8,
          textAlign: align === 'right' ? 'right' : 'left',
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  )

  const centerColumn = (
    <div className="r-exp-timeline-center flex flex-col items-center" style={{ width: 20 }}>
      <span
        data-testid="timeline-dot"
        className="block rounded-full"
        style={{
          width: 12,
          height: 12,
          backgroundColor: 'var(--ryokan-light-gold, #D4C5A0)',
        }}
      />
      {!isLast && (
        <span
          className="block"
          style={{
            width: 2,
            height: 'var(--r-exp-timeline-line-h)',
            backgroundColor: 'var(--ryokan-timeline-line, #5A4A30)',
          }}
        />
      )}
    </div>
  )

  return (
    <div
      className="r-exp-timeline-row flex w-full"
      style={{
        gap: 'var(--r-exp-timeline-item-gap)',
        padding: 'var(--r-exp-timeline-item-py) 0',
      }}
    >
      {align === 'left' ? (
        <>
          {timeContent}
          {centerColumn}
          {infoContent}
        </>
      ) : (
        <>
          {infoContent}
          {centerColumn}
          {timeContent}
        </>
      )}
    </div>
  )
}

export function TimelineSection() {
  return (
    <section
      className="w-full flex flex-col"
      style={{
        backgroundImage: 'var(--experience-timeline-bg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="flex flex-col items-center w-full"
        style={{
          backgroundColor: 'var(--ryokan-overlay-dark, rgba(26, 21, 14, 0.53))',
          padding: 'var(--r-exp-timeline-py) var(--r-exp-timeline-px)',
        }}
      >
        {/* Title */}
        <h2
          className="text-center"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--r-exp-timeline-title)',
            fontWeight: 600,
            color: 'var(--ryokan-cream, #F5F0E8)',
            letterSpacing: 'var(--r-exp-timeline-title-ls)',
            margin: 0,
          }}
        >
          月瀬庵での一日
        </h2>

        {/* Subtitle */}
        <span
          className="text-center"
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 'var(--r-exp-timeline-sub-size)',
            fontWeight: 500,
            color: 'var(--ryokan-light-gold, #D4C5A0)',
            letterSpacing: 4,
            marginTop: 8,
          }}
        >
          A Day at Tsukise-An
        </span>

        {/* Spacer */}
        <div style={{ height: 48 }} />

        {/* Timeline items */}
        <div className="flex flex-col w-full">
          {timelineEvening.map((item) => (
            <TimelineItem key={item.time} {...item} />
          ))}

          {/* Morning divider */}
          <div
            className="flex flex-col items-center w-full"
            style={{ padding: '16px 0' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--ryokan-light-gold, #D4C5A0)',
                letterSpacing: 4,
                textAlign: 'center',
              }}
            >
              翌 朝
            </span>
          </div>

          {timelineMorning.map((item) => (
            <TimelineItem key={item.time} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
