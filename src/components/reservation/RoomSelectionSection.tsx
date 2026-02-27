import Image from 'next/image'

const rooms = [
  {
    labelEn: 'TSUKIMI',
    name: '月見の間',
    price: '¥85,000〜 / 1泊2食付',
    image: '/images/rooms/tsukimi.jpg',
  },
  {
    labelEn: 'KACHO',
    name: '花鳥の間',
    price: '¥65,000〜 / 1泊2食付',
    image: '/images/rooms/kacho.jpg',
  },
  {
    labelEn: 'FUGA',
    name: '風雅の間',
    price: '¥55,000〜 / 1泊2食付',
    image: '/images/rooms/fuga.jpg',
  },
  {
    labelEn: 'MIKAGAMI',
    name: '水鏡の間',
    price: '¥45,000〜 / 1泊2食付',
    image: '/images/rooms/mikagami.jpg',
  },
]

export function RoomSelectionSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: 'var(--r-resv-rooms-pt) var(--r-resv-rooms-px) var(--r-resv-rooms-pb)',
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
        客室タイプを選択してください
      </h2>

      <div className="r-resv-rooms-grid">
        {rooms.map((room) => (
          <div
            key={room.labelEn}
            data-testid="room-card"
            className="flex flex-col overflow-hidden"
            style={{
              borderRadius: 4,
              border: '1px solid rgba(212, 197, 160, 0.13)',
            }}
          >
            {/* Room image */}
            <div
              className="relative overflow-hidden"
              style={{ height: 180, width: '100%' }}
            >
              <Image
                src={room.image}
                alt={room.name}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Room info */}
            <div
              className="flex flex-col"
              style={{
                backgroundColor: 'var(--ryokan-light-bg, #EEEBE3)',
                padding: 20,
                gap: 12,
              }}
            >
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

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--ryokan-dark, #2C2418)',
                  letterSpacing: 2,
                }}
              >
                {room.name}
              </h3>

              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'var(--ryokan-secondary, #6B5D4F)',
                }}
              >
                {room.price}
              </span>

              <button
                className="flex w-full items-center justify-center"
                style={{
                  backgroundColor: 'var(--ryokan-gold, #8B6914)',
                  borderRadius: 2,
                  padding: '10px 0',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--ryokan-bg, #FAF8F3)',
                    letterSpacing: 1,
                  }}
                >
                  この客室を予約する
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
