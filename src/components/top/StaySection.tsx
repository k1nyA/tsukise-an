import Image from 'next/image'
import { SectionLabel } from '@/components/shared/SectionLabel'

const timelineAfternoon = [
  {
    hour: '15:00',
    title: 'チェックイン・お出迎え',
    description: '抹茶と季節の和菓子で\nお迎えいたします',
    image: '/images/stay-1500.png',
  },
  {
    hour: '15:30',
    title: 'お部屋へご案内',
    description: '離れの客室にて\nゆっくりとお寛ぎください',
    image: '/images/stay-1530.jpg',
  },
  {
    hour: '16:00',
    title: '客室露天風呂',
    description: 'プライベートな露天風呂で\n旅の疲れを癒して',
    image: '/images/stay-1600.jpg',
  },
  {
    hour: '17:00',
    title: '庭園散策',
    description: '回遊式庭園と苔庭を\nゆったりと巡ります',
    image: '/images/stay-1700.jpg',
  },
]

const timelineEvening = [
  {
    hour: '18:30',
    title: '夕食・懐石',
    description: '個室にて月替わりの\n懐石料理をお楽しみに',
    image: '/images/stay-1830.png',
  },
  {
    hour: '20:00',
    title: '湯上がりラウンジ',
    description: 'お飲み物とともに\nくつろぎのひととき',
    image: '/images/stay-2000.jpg',
  },
  {
    hour: '21:00',
    title: '月見の湯',
    description: '月明かりに照らされた\n露天風呂で至福のひとときを',
    image: '/images/stay-2100.png',
  },
]

const timelineMorning = [
  {
    hour: '08:00',
    title: '朝食',
    description: '箱根の朝を感じる\n和の朝ごはん',
    image: '/images/stay-0800.png',
  },
  {
    hour: '10:00',
    title: 'チェックアウト準備',
    description: 'お荷物のご準備と\nお土産処のご案内',
    image: '/images/stay-1000.jpg',
  },
  {
    hour: '11:00',
    title: 'お見送り',
    description: '芦ノ湖の景色を胸に\nお帰りの途へ',
    image: '/images/stay-1100.png',
  },
]

function TimelineCard({
  hour,
  title,
  description,
  image,
}: {
  hour: string
  title: string
  description: string
  image: string
}) {
  return (
    <div className="flex flex-1 flex-col items-center gap-3">
      {/* Hour */}
      <span
        style={{
          fontFamily: 'var(--font-accent)',
          fontSize: 20,
          fontWeight: 400,
          color: 'var(--ryokan-gold)',
          letterSpacing: 2,
        }}
      >
        {hour}
      </span>

      {/* Timeline image */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: '4/3',
          backgroundColor: 'var(--ryokan-light-bg)',
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 16,
          fontWeight: 500,
          color: 'var(--ryokan-dark)',
          letterSpacing: 2,
          margin: 0,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          fontWeight: 300,
          color: 'var(--ryokan-muted)',
          letterSpacing: 1,
          lineHeight: 1.8,
          textAlign: 'center',
          margin: 0,
          whiteSpace: 'pre-line',
        }}
      >
        {description}
      </p>
    </div>
  )
}

export function StaySection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-bg)',
        padding: '100px 80px',
        gap: 60,
      }}
    >
      {/* Label */}
      <SectionLabel english="EXPERIENCE" />

      {/* Title */}
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 32,
          fontWeight: 600,
          color: 'var(--ryokan-dark)',
          letterSpacing: 4,
          textAlign: 'center',
          margin: 0,
        }}
      >
        月瀬庵での過ごし方
      </h2>

      {/* Afternoon timeline row */}
      <div className="flex w-full gap-8">
        {timelineAfternoon.map((item) => (
          <TimelineCard key={item.hour} {...item} />
        ))}
      </div>

      {/* Evening timeline row */}
      <div className="flex w-full justify-center gap-8">
        {timelineEvening.map((item) => (
          <TimelineCard key={item.hour} {...item} />
        ))}
      </div>

      {/* Divider: next morning */}
      <div className="flex w-full items-center gap-6">
        <span
          className="block flex-1"
          style={{
            height: 1,
            backgroundColor: 'var(--ryokan-soft-line)',
          }}
          aria-hidden="true"
        />
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 14,
            fontWeight: 400,
            color: 'var(--ryokan-subtle)',
            letterSpacing: 4,
            whiteSpace: 'nowrap',
          }}
        >
          翌 朝
        </span>
        <span
          className="block flex-1"
          style={{
            height: 1,
            backgroundColor: 'var(--ryokan-soft-line)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Morning timeline row */}
      <div className="flex w-full justify-center gap-8">
        {timelineMorning.map((item) => (
          <TimelineCard key={item.hour} {...item} />
        ))}
      </div>
    </section>
  )
}
