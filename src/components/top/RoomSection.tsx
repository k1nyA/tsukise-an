import Link from 'next/link'

export function RoomSection() {
  return (
    <section className="flex w-full" style={{ height: 560 }}>
      {/* Image area */}
      <div
        className="relative overflow-hidden"
        style={{
          width: 800,
          height: 560,
          backgroundColor: 'var(--ryokan-dark)',
          flexShrink: 0,
        }}
      />

      {/* Content area */}
      <div
        className="flex flex-1 flex-col justify-center"
        style={{
          backgroundColor: 'var(--ryokan-dark)',
          padding: 80,
          gap: 32,
        }}
      >
        {/* Label row */}
        <div className="flex items-center gap-3">
          <span
            className="block"
            style={{
              width: 40,
              height: 1,
              backgroundColor: 'var(--ryokan-light-gold)',
            }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--ryokan-text-subtle)',
              letterSpacing: 5,
            }}
          >
            ROOMS
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 32,
            fontWeight: 600,
            color: 'var(--ryokan-text-on-dark)',
            letterSpacing: 6,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          全八室の
          <br />
          離れ
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            fontWeight: 300,
            color: 'var(--ryokan-text-subtle)',
            letterSpacing: 1,
            lineHeight: 2,
            margin: 0,
          }}
        >
          一棟独立の離れ形式で、
          芦ノ湖を望む自然の中、
          お二人だけの静寂な時間を
          お過ごしいただけます。
          <br />
          <br />
          全室に源泉掛け流しの
          専用露天風呂を備えております。
        </p>

        {/* Link */}
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--ryokan-light-gold)',
            letterSpacing: 2,
            textDecoration: 'none',
          }}
        >
          客室を見る
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  )
}
