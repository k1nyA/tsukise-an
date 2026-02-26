import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Mouse } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: 'var(--r-hero-height)' }}>
      <Image
        src="/images/top-hero-main.png"
        alt="芦ノ湖畔の月瀬庵"
        fill
        className="object-cover"
        priority
        quality={85}
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: '#1A150E77' }}
        aria-hidden="true"
      />

      <div
        className="relative z-10 flex flex-col"
        style={{
          gap: 'var(--r-hero-content-gap)',
          top: 'var(--r-hero-content-y)',
          left: 'var(--r-hero-content-x)',
        }}
      >
        <div className="flex items-center" style={{ gap: 16 }}>
          <span
            style={{ width: 40, height: 1, backgroundColor: 'var(--ryokan-light-gold)' }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              fontWeight: 'normal',
              color: 'var(--ryokan-light-gold)',
              letterSpacing: 4,
            }}
          >
            箱根 芦ノ湖畔
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--r-hero-title-size)',
            fontWeight: 'bold',
            color: '#faf8f3',
            letterSpacing: 'var(--r-hero-title-spacing)',
            lineHeight: 1.5,
            margin: 0,
            width: 'var(--r-hero-headline-w)',
          }}
        >
          湖と月、
          <br />
          そして静寂。
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--r-hero-sub-size)',
            fontWeight: 300,
            color: 'var(--ryokan-light-gold)',
            letterSpacing: 'var(--r-hero-sub-spacing)',
            margin: 0,
          }}
        >
          芦ノ湖の湖面に映る月を眺める、全八室の離れ宿
        </p>

        <Link
          href="#concept"
          className="inline-flex items-center"
          style={{
            gap: 12,
            padding: '14px 40px',
            border: '1px solid #D4C5A0CC',
            backgroundColor: 'transparent',
            textDecoration: 'none',
            width: 'fit-content',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 'normal',
              color: '#D4C5A0',
              letterSpacing: 3,
            }}
          >
            宿を知る
          </span>
          <ChevronRight size={14} color="#D4C5A0" />
        </Link>
      </div>

      <div
        className="absolute z-10 flex flex-col items-center"
        style={{
          gap: 6,
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: 24,
        }}
      >
        <Mouse size={20} color="#D4C5A088" strokeWidth={1.5} />
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 10,
            fontWeight: 'normal',
            color: '#D4C5A088',
            letterSpacing: 3,
          }}
        >
          Scroll
        </span>
      </div>
    </section>
  )
}
