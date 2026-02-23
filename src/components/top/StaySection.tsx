import Image from 'next/image'

const timelineAfternoon = [
  { hour: '15:00', title: 'チェックイン・お出迎え', desc: '抹茶と季節の和菓子で\nお迎えいたします', image: '/images/stay-1500.png' },
  { hour: '15:30', title: 'お部屋へご案内', desc: '離れの客室にて\nゆっくりとお寛ぎください', image: '/images/stay-1530.jpg' },
  { hour: '16:00', title: '客室露天風呂', desc: 'プライベートな露天風呂で\n旅の疲れを癒して', image: '/images/stay-1600.jpg' },
  { hour: '17:00', title: '庭園散策', desc: '回遊式庭園と苔庭を\nゆったりと巡ります', image: '/images/stay-1700.jpg' },
]

const timelineEvening = [
  { hour: '18:30', title: '夕食・懐石', desc: '個室にて月替わりの\n懐石料理をお楽しみに', image: '/images/stay-1830.png' },
  { hour: '20:00', title: '湯上がりラウンジ', desc: 'お飲み物とともに\nくつろぎのひととき', image: '/images/stay-2000.jpg' },
  { hour: '21:00', title: '月見の湯', desc: '月明かりに照らされた\n露天風呂で至福のひとときを', image: '/images/stay-2100.png' },
]

const timelineMorning = [
  { hour: '08:00', title: '朝食', desc: '箱根の朝を感じる\n和の朝ごはん', image: '/images/stay-0800.png' },
  { hour: '10:00', title: 'チェックアウト準備', desc: 'お荷物のご準備と\nお土産処のご案内', image: '/images/stay-1000.jpg' },
  { hour: '11:00', title: 'お見送り', desc: '芦ノ湖の景色を胸に\nお帰りの途へ', image: '/images/stay-1100.png' },
]

function TimelineCard({ hour, title, desc, image }: { hour: string; title: string; desc: string; image: string }) {
  return (
    <div className="flex flex-1 flex-col items-center" style={{ gap: 20, paddingTop: 8 }}>
      <span
        style={{
          fontFamily: 'var(--font-accent)',
          fontSize: 28,
          fontWeight: 500,
          color: 'var(--ryokan-gold)',
          letterSpacing: 2,
        }}
      >
        {hour}
      </span>
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 'var(--r-timeline-img-h)' }}
      >
        <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 767px) 100vw, 25vw" />
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 16,
          fontWeight: 600,
          color: 'var(--ryokan-dark)',
          letterSpacing: 2,
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--r-body-xs)',
          fontWeight: 300,
          color: 'var(--ryokan-muted)',
          lineHeight: 1.8,
          textAlign: 'center',
          margin: 0,
          whiteSpace: 'pre-line',
        }}
      >
        {desc}
      </p>
    </div>
  )
}

export function StaySection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        padding: 'var(--r-center-py) var(--r-center-px)',
        gap: 'var(--r-stay-gap)',
        backgroundColor: 'var(--ryokan-bg)',
        backgroundImage: 'url(/images/stay-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex items-center" style={{ gap: 20 }}>
        <span
          style={{ width: 60, height: 1, backgroundColor: 'var(--ryokan-light-gold)' }}
          aria-hidden="true"
        />
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--ryokan-subtle)',
            letterSpacing: 5,
          }}
        >
          EXPERIENCE
        </span>
        <span
          style={{ width: 60, height: 1, backgroundColor: 'var(--ryokan-light-gold)' }}
          aria-hidden="true"
        />
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--r-title-md)',
          fontWeight: 600,
          color: 'var(--ryokan-dark)',
          letterSpacing: 'var(--r-title-spacing-md)',
          textAlign: 'center',
          margin: 0,
        }}
      >
        月瀬庵での過ごし方
      </h2>

      <div className="flex w-full flex-col" style={{ gap: 24 }}>
        <div className="r-grid-row w-full" style={{ gap: 'var(--r-timeline-gap)' }}>
          {timelineAfternoon.map((item) => (
            <TimelineCard key={item.hour} {...item} />
          ))}
        </div>

        <div className="r-grid-row w-full" style={{ gap: 'var(--r-timeline-gap)' }}>
          {timelineEvening.map((item) => (
            <TimelineCard key={item.hour} {...item} />
          ))}
        </div>

        <div className="flex w-full items-center justify-center" style={{ gap: 24 }}>
          <span
            style={{
              width: 'var(--r-divider-w)',
              height: 1,
              backgroundColor: 'var(--ryokan-light-gold)',
            }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 14,
              fontWeight: 'normal',
              color: 'var(--ryokan-subtle)',
              letterSpacing: 8,
            }}
          >
            翌 朝
          </span>
          <span
            style={{
              width: 'var(--r-divider-w)',
              height: 1,
              backgroundColor: 'var(--ryokan-light-gold)',
            }}
            aria-hidden="true"
          />
        </div>

        <div className="r-grid-row w-full" style={{ gap: 'var(--r-timeline-gap)' }}>
          {timelineMorning.map((item) => (
            <TimelineCard key={item.hour} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
