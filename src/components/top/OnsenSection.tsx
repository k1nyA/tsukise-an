import Image from 'next/image'
import Link from 'next/link'

export function OnsenSection() {
  return (
    <section className="flex w-full" style={{ height: 560 }}>
      {/* Left: Content area (light bg) */}
      <div
        className="flex flex-1 flex-col justify-center"
        style={{
          backgroundColor: 'var(--ryokan-light-bg)',
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
              color: 'var(--ryokan-subtle)',
              letterSpacing: 5,
            }}
          >
            ONSEN
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 32,
            fontWeight: 600,
            color: 'var(--ryokan-dark)',
            letterSpacing: 6,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          湖を望む
          <br />
          湯処
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            fontWeight: 300,
            color: 'var(--ryokan-muted)',
            letterSpacing: 1,
            lineHeight: 2,
            margin: 0,
          }}
        >
          箱根十七湯のひとつ、
          姥子温泉の源泉を引き入れた
          露天風呂からは、
          四季折々の芦ノ湖が広がります。
          <br />
          <br />
          泉質は単純硫黄泉。
          美肌の湯として古くから知られ、
          身体の芯から温まります。
        </p>

        {/* Link */}
        <Link
          href="/onsen"
          className="inline-flex items-center gap-2"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--ryokan-gold)',
            letterSpacing: 2,
            textDecoration: 'none',
          }}
        >
          温泉を見る
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* Right: Onsen image (800px wide) */}
      <div
        className="relative overflow-hidden"
        style={{
          width: 800,
          height: 560,
          flexShrink: 0,
        }}
      >
        <Image
          src="/images/onsen.png"
          alt="月瀬庵の露天風呂"
          fill
          className="object-cover"
          sizes="800px"
        />
      </div>
    </section>
  )
}
