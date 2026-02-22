import Link from 'next/link'

type RoomData = {
  labelEn: string
  name: string
  size: string
  description: string
  tags: string[]
}

const rooms: RoomData[] = [
  {
    labelEn: 'TSUKIMI',
    name: '月見の間',
    size: '120㎡ ｜ 最上階・芦ノ湖ビュー',
    description:
      '芦ノ湖を一望する最上階の特別室。\n月の出を正面に望む唯一の客室です。',
    tags: ['露天風呂付', '芦ノ湖ビュー', '最上階'],
  },
  {
    labelEn: 'KACHO',
    name: '花鳥の間',
    size: '100㎡ ｜ 庭園ビュー',
    description:
      '四季折々の日本庭園を臨む離れ。\n檜の内湯で森林の香りに包まれます。',
    tags: ['檜風呂付', '庭園ビュー'],
  },
  {
    labelEn: 'FUGA',
    name: '風雅の間',
    size: '85㎡ ｜ 林間の離れ',
    description:
      '深い森に抱かれた静謐な一棟。\n岩造りの露天風呂で森林浴を。',
    tags: ['露天風呂付', '林間'],
  },
  {
    labelEn: 'MIKAGAMI',
    name: '水鏡の間',
    size: '75㎡ ｜ 湖畔の離れ',
    description:
      '湖面に映る月が名前の由来。\n石造りの露天風呂から芦ノ湖を眺めて。',
    tags: ['露天風呂付', '湖畔'],
  },
  {
    labelEn: 'MATSUKAZE',
    name: '松風の間',
    size: '90㎡ ｜ 松林の離れ',
    description:
      '松風が通り抜ける高台の一棟。\n石庭を望む露天風呂で四季を感じて。',
    tags: ['露天風呂付', '松林'],
  },
  {
    labelEn: 'SETSUGETSU',
    name: '雪月の間',
    size: '95㎡ ｜ 山麓の離れ',
    description:
      '雪見障子から望む箱根の山々。\n冬は雪景色が格別の趣を添えます。',
    tags: ['露天風呂付', '山麓'],
  },
  {
    labelEn: 'ASAGIRI',
    name: '朝霧の間',
    size: '80㎡ ｜ 渓谷ビュー',
    description:
      '朝霧に包まれる渓谷沿いの離れ。\nせせらぎの音が心を癒します。',
    tags: ['露天風呂付', '渓谷ビュー'],
  },
  {
    labelEn: 'YUNAGI',
    name: '夕凪の間',
    size: '70㎡ ｜ 芦ノ湖ビュー',
    description:
      '夕暮れ時の凪いだ湖面が美しい一棟。\n檜の半露天風呂をお楽しみください。',
    tags: ['半露天風呂付', '芦ノ湖ビュー'],
  },
]

function RoomCard({ room }: { room: RoomData }) {
  return (
    <article
      className="flex flex-col overflow-hidden"
      style={{ flex: '1 1 0' }}
    >
      {/* Image placeholder */}
      <div
        aria-label={`${room.name}の客室イメージ`}
        style={{
          height: 320,
          width: '100%',
          backgroundColor: 'var(--ryokan-darkest, #1A150E)',
        }}
      />

      {/* Room info */}
      <div
        className="flex flex-col"
        style={{
          backgroundColor: 'var(--ryokan-light-bg, #EEEBE3)',
          gap: 12,
          padding: '28px 24px',
        }}
      >
        {/* English label */}
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 11,
            fontWeight: 500,
            color: 'var(--ryokan-gold, #8B6914)',
            letterSpacing: 4,
          }}
        >
          {room.labelEn}
        </span>

        {/* Room name */}
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 22,
            fontWeight: 600,
            color: 'var(--ryokan-dark, #2C2418)',
            letterSpacing: 3,
          }}
        >
          {room.name}
        </h3>

        {/* Size / location */}
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            fontWeight: 300,
            color: 'var(--ryokan-secondary, #6B5D4F)',
            letterSpacing: 1,
          }}
        >
          {room.size}
        </span>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 300,
            color: 'var(--ryokan-subtle, #8B7D6B)',
            letterSpacing: 0.5,
            lineHeight: 1.8,
            whiteSpace: 'pre-line',
          }}
        >
          {room.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap" style={{ gap: 8 }}>
          {room.tags.map((tag) => (
            <span
              key={tag}
              style={{
                backgroundColor: '#D4C5A022',
                borderRadius: 12,
                padding: '4px 12px',
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                color: 'var(--ryokan-gold, #8B6914)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export function RoomGridSection() {
  // Split rooms into pairs for 2-column rows
  const rows: RoomData[][] = []
  for (let i = 0; i < rooms.length; i += 2) {
    rows.push(rooms.slice(i, i + 2))
  }

  return (
    <section
      className="flex w-full flex-col items-center"
      style={{ padding: '40px 80px 100px 80px', gap: 32 }}
    >
      {/* Section heading */}
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
        客室のご案内
      </h2>

      {/* Room grid rows */}
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex w-full"
          style={{ gap: 24 }}
        >
          {row.map((room) => (
            <RoomCard key={room.labelEn} room={room} />
          ))}
        </div>
      ))}

      {/* Vacancy link */}
      <div
        className="flex w-full items-center justify-center"
        style={{ padding: '24px 0' }}
      >
        <Link
          href="/reservation"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--ryokan-gold, #8B6914)',
            letterSpacing: 1,
            textDecoration: 'none',
          }}
        >
          空室を確認する →
        </Link>
      </div>
    </section>
  )
}
